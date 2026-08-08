import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const criticalImpacts = new Set(['serious', 'critical'])

test.describe.serial('THE FLOOR release path', () => {
  test('truth, landmarks, console, reflow, and accessibility hold on desktop', async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()) })
    page.on('pageerror', (error) => consoleErrors.push(error.message))

    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/')

    await expect(page).toHaveTitle(/THE FLOOR/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('The world doesn’t arrive at consensus. You draft it.')
    await expect(page.getByText(/concept conference experience/i)).toBeVisible()
    await expect(page.getByText(/no UN affiliation is implied/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /register/i })).toHaveCount(0)
    await expect(page.getByRole('button', { name: /register/i })).toHaveCount(0)

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(1)

    const titleCollisions = await page.locator('.committee-dossier').evaluateAll((dossiers) => dossiers.flatMap((dossier) => {
      const title = dossier.querySelector('h3')?.getBoundingClientRect()
      const pressure = dossier.querySelector('.pressure-pair')?.getBoundingClientRect()
      return title && pressure && title.right > pressure.left - 12 ? [dossier.querySelector('h3')?.textContent ?? 'unknown'] : []
    }))
    expect(titleCollisions).toEqual([])

    const accessibility = await new AxeBuilder({ page }).analyze()
    const blockers = accessibility.violations.filter((violation) => criticalImpacts.has(violation.impact ?? ''))
    expect(blockers, blockers.map((item) => `${item.id}: ${item.help}`).join('\n')).toEqual([])
    expect(consoleErrors).toEqual([])
  })

  test('mobile navigation, briefing dialog, and focus return work', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const menu = page.locator('button[aria-controls="site-navigation"]')
    await expect(menu).toHaveAccessibleName(/open navigation/i)
    await menu.click()
    await expect(menu).toHaveAccessibleName(/close navigation/i)
    await expect(menu).toHaveAttribute('aria-expanded', 'true')
    const navigation = page.getByRole('navigation', { name: /primary navigation/i })
    await expect(navigation).toBeVisible()
    const navigationBox = await navigation.boundingBox()
    expect(navigationBox?.width).toBeGreaterThanOrEqual(389)
    await page.keyboard.press('Escape')
    await expect(menu).toBeFocused()

    const trigger = page.getByRole('button', { name: /enter the delegate briefing/i }).first()
    await trigger.click()
    const dialog = page.getByRole('dialog', { name: /build briefing/i })
    await expect(dialog).toBeVisible()
    await expect(dialog).toContainText('Not registration')
    await page.getByRole('button', { name: /close briefing/i }).click()
    await expect(trigger).toBeFocused()

    const accessibility = await new AxeBuilder({ page }).analyze()
    const blockers = accessibility.violations.filter((violation) => criticalImpacts.has(violation.impact ?? ''))
    expect(blockers, blockers.map((item) => `${item.id}: ${item.help}`).join('\n')).toEqual([])

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(1)

    const mediaComposition = await page.locator('#motion-study').evaluate((section) => {
      const heading = section.querySelector('.motion-study__heading h2') as HTMLElement | null
      const video = section.querySelector('video') as HTMLVideoElement | null
      if (!heading || !video) return null
      const headingRect = heading.getBoundingClientRect()
      const textRight = Math.max(...[...heading.querySelectorAll('span')].map((span) => span.getBoundingClientRect().right))
      const videoRect = video.getBoundingClientRect()
      return {
        headingSpill: textRight - headingRect.right,
        displayedAspect: videoRect.width / videoRect.height,
        naturalAspect: video.videoWidth / video.videoHeight,
      }
    })
    expect(mediaComposition).not.toBeNull()
    expect(mediaComposition?.headingSpill).toBeLessThanOrEqual(1)
    expect(Math.abs((mediaComposition?.displayedAspect ?? 0) - (mediaComposition?.naturalAspect ?? 0))).toBeLessThanOrEqual(0.02)
  })

  test('procedure and preparation commit visible state and survive reload', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('tab', { name: /amend/i }).click()
    await expect(page.getByTestId('resolution-clause')).toContainText('Replaces contested language')
    await expect(page.getByLabel('Procedure progress')).toHaveAttribute('aria-valuenow', '4')

    const firstCheck = page.getByRole('checkbox').first()
    await firstCheck.check()
    await expect(page.getByRole('status')).toContainText('1 of 5 ready')
    await page.reload()
    await expect(page.getByRole('checkbox').first()).toBeChecked()
    await page.getByRole('button', { name: /reset preparation/i }).click()
    await expect(page.getByRole('checkbox').first()).not.toBeChecked()
  })

  test('full motion orchestra registers bounded GSAP actors and scroll triggers', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/')

    const root = page.locator('html')
    await expect(root).toHaveAttribute('data-motion-mode', 'full')
    await expect(root).toHaveAttribute('data-motion-engine', 'gsap')
    await expect(root).toHaveAttribute('data-motion-ready', 'true')

    const diagnostics = await page.evaluate(() => (window as typeof window & {
      __THE_FLOOR_MOTION__?: { mode: string; actorCount: number; scrollTriggerCount: number; mediaActorCount: number; textTimelineCount: number }
    }).__THE_FLOOR_MOTION__)
    expect(diagnostics?.mode).toBe('full')
    expect(diagnostics?.actorCount).toBeGreaterThanOrEqual(12)
    expect(diagnostics?.scrollTriggerCount).toBeGreaterThanOrEqual(6)
    expect(diagnostics?.mediaActorCount).toBeGreaterThanOrEqual(5)
    expect(diagnostics?.textTimelineCount).toBeGreaterThanOrEqual(2)
    const cssAnimationNames = await page.locator('.hero-copy > *').evaluateAll((actors) => actors.map((actor) => getComputedStyle(actor).animationName))
    expect(new Set(cssAnimationNames)).toEqual(new Set(['none']))
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('The world doesn’t arrive at consensus. You draft it.')

    await page.locator('#motion-study').scrollIntoViewIfNeeded()
    await page.waitForTimeout(1100)
    const accessibility = await new AxeBuilder({ page }).analyze()
    const blockers = accessibility.violations.filter((violation) => criticalImpacts.has(violation.impact ?? ''))
    expect(blockers, blockers.map((item) => `${item.id}: ${item.help}`).join('\n')).toEqual([])
  })

  test('reduced motion removes meaningful travel and 320px reflow remains intact', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 320, height: 800 })
    await page.goto('/')

    const motion = await page.locator('.hero-copy > *').first().evaluate((element) => {
      const style = getComputedStyle(element)
      return { duration: style.animationDuration, transform: style.transform }
    })
    const seconds = motion.duration.endsWith('ms') ? Number.parseFloat(motion.duration) / 1000 : Number.parseFloat(motion.duration)
    expect(seconds).toBeLessThanOrEqual(0.001)
    expect(motion.transform).toBe('none')

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(1)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('captures representative desktop and mobile evidence', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/')
    await page.screenshot({ path: 'evidence/desktop-opening.png' })
    await page.locator('#committees').scrollIntoViewIfNeeded()
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur())
    await page.screenshot({ path: 'evidence/desktop-committees.png' })
    await page.locator('#delegate-desk').scrollIntoViewIfNeeded()
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur())
    await page.screenshot({ path: 'evidence/desktop-delegate-desk.png' })

    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.screenshot({ path: 'evidence/mobile-opening.png' })
    await page.getByRole('button', { name: /open navigation/i }).click()
    await page.screenshot({ path: 'evidence/mobile-menu.png' })
    await page.keyboard.press('Escape')
    await page.getByRole('button', { name: /enter the delegate briefing/i }).first().click()
    await page.screenshot({ path: 'evidence/mobile-briefing.png' })
  })
})

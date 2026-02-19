export const vibratePattern = (pattern) => {
    // Check if navigator.vibrate is supported
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(pattern);
        return;
    }

    // Fallback for Safari/iOS which doesn't support navigator.vibrate
    // This is a "hack" but effective on newer iOS devices
    // We create a temporary checkbox, append it, and toggle it to trigger haptic feedback
    // Note: This relies on user interaction (onclick/ontouch) which usually is the trigger source anyway
    try {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        if (isIOS) {
            // TODO: Revisit iOS vibration support.
            // The current "switch" checkbox hack is unreliable on some iOS versions/devices.
            // Consider testing with future iOS updates or alternative haptic libraries (e.g., dedicated PWA patterns).
            // For now, this is a best-effort attempt.

            // iOS Haptic Hack: Use a hidden checkbox with 'switch' attribute
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('switch', 'switch');
            checkbox.style.position = 'fixed';
            checkbox.style.opacity = '0';
            checkbox.style.pointerEvents = 'none';

            document.body.appendChild(checkbox);

            // Toggle it to trigger haptic (click() is better than checking property)
            checkbox.focus(); // Ensure it can be clicked
            checkbox.click();

            // Cleanup immediately
            setTimeout(() => {
                document.body.removeChild(checkbox);
            }, 50);
        }
    } catch (e) {
        // Ignore errors
    }
};

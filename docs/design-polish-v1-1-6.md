# Fourpattes design polish v1.1.6

This branch adds a non-destructive CSS override layer on top of `pet-theme.css`.

## Main improvements

- Keeps the logo ratio intact with responsive desktop and mobile sizing.
- Uses the existing Fredoka typography tokens consistently.
- Enlarges product titles, prices and badges for better readability.
- Improves the mobile hero spacing and the transition between copy and animals.
- Preserves the native 1672×941 desktop artwork ratio.
- Prevents the hero artwork from stretching on wide and ultrawide screens.
- Keeps safe, color-matched gutters when the viewport is wider than the source artwork.

## Files

- `assets/design-polish-v1-1-6.css`
- `layout/theme.liquid`

## Test widths

375, 448, 768, 1024, 1366, 1440, 1920 and 2560 pixels.

export function explode(targetSelector: string) {
  const gravity = 0.35; // Acceleration due to gravity
  let elements = document.querySelectorAll(targetSelector); // Select all elements on the page

  elements.forEach((el) => {
    let top = 0;
    let left = 0;
    // Initial velocity with a random upward and sideways direction
    let velocityY = -Math.random() * 10; // Upward initial velocity
    let velocityX = (Math.random() - 0.5) * 10; // Sideways initial velocity

    const start = Date.now();

    function fall() {
      velocityY += gravity; // Increase downward velocity by gravity
      top += velocityY; // Move element down by velocityY
      left += velocityX; // Move element sideways by velocityX

      // Apply the position changes
      el.style.position = "relative";
      el.style.top = `${top}px`;
      el.style.left = `${left}px`;

      // Continue the animation if it's not time to stop
      if (Date.now() - start < 2500) requestAnimationFrame(fall);
      else el.remove();
    }

    fall();
  });
}

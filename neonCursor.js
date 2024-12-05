// neonCursor.js

function neonCursor(options) {
    const cursor = document.createElement('div');
    cursor.style.position = 'absolute';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.transition = 'transform 0.1s ease-out, background-color 0.1s ease-out';
    cursor.style.backgroundColor = '#00ccff';
    cursor.style.width = `${options.radius1 * 2}px`;
    cursor.style.height = `${options.radius1 * 2}px`;

    document.body.appendChild(cursor);

    function updateCursor(e) {
        cursor.style.left = `${e.pageX - options.radius1}px`;
        cursor.style.top = `${e.pageY - options.radius1}px`;
    }

    function onMouseMove(e) {
        updateCursor(e);
    }

    document.addEventListener('mousemove', onMouseMove);

    // Optionally, add animation or interaction effects
    // For example, you can expand the cursor on hover or add glow effect

    return {
        destroy() {
            document.removeEventListener('mousemove', onMouseMove);
            document.body.removeChild(cursor);
        }
    };
}

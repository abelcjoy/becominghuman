const canvas = document.getElementById('gardenCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let minutes = parseInt(localStorage.getItem('recovery_minutes') || 0);

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight * 0.7;
}

window.addEventListener('resize', resize);
resize();

function drawTree(startX, startY, len, angle, branchWidth, color1, color2, depth) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    if (len < 10) {
        // Draw Flowers/Leaves if we have enough minutes
        if (minutes > 10) {
            ctx.beginPath();
            ctx.arc(0, -len, 4, 0, Math.PI * 2);
            ctx.fillStyle = minutes > 50 ? '#8b5cf6' : '#10b981';
            ctx.fill();
        }
        ctx.restore();
        return;
    }

    // Branching logic influenced by progress
    const nextLen = len * 0.75;
    const branchAngle = 20 + (Math.sin(Date.now() / 1000) * 5); // Subtle sway

    drawTree(0, -len, nextLen, angle + branchAngle, branchWidth * 0.7, color1, color2, depth + 1);
    drawTree(0, -len, nextLen, angle - branchAngle, branchWidth * 0.7, color1, color2, depth + 1);

    ctx.restore();
}

function updateGarden() {
    ctx.clearRect(0, 0, width, height);

    // Scale tree size by minutes (Stage progression)
    let stage = "Seedling";
    let baseLen = 40;

    if (minutes >= 100) {
        stage = "Eternal Oak";
        baseLen = 120;
    } else if (minutes >= 50) {
        stage = "Blooming Willow";
        baseLen = 90;
    } else if (minutes >= 20) {
        stage = "Sapling";
        baseLen = 70;
    }

    // Draw the tree in the center-bottom
    drawTree(width / 2, height - 20, baseLen, 0, 8, '#94a3b8', '#10b981', 0);

    requestAnimationFrame(updateGarden);
}

updateGarden();

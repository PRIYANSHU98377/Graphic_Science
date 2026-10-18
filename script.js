(() => {
  "use strict";

  const canvas = document.getElementById("drawing-board");
  const ctx = canvas.getContext("2d");
  const cx = 450;
  const cy = 322;
  const outerRadius = 174;
  const innerRadius = 112;
  const duration = 590;

  const steps = [
    {
      title: "Place the drawing sheet",
      description: "Lift the sheet onto the drawing board, align its edges with the board, and smooth it flat.",
      why: "A flat, aligned sheet prevents the drafter from slipping and keeps the construction correctly positioned.",
      instrument: "Drawing sheet · Drawing board",
      rule: "Leave a clear margin around the drawing; keep the sheet flat and securely aligned.",
      actions: ["Lift the sheet onto the drawing board.", "Align the sheet with the board edges.", "Smooth and settle the sheet flat."],
      tool: "DRAWING SHEET"
    },
    {
      title: "Align the drafter",
      description: "Move the drafter head to the working area, set its blade horizontally, lock it, and draw a light reference line.",
      why: "A locked horizontal reference makes it easier to place the centre and draw the two perpendicular diameters accurately.",
      instrument: "Drafter · H pencil",
      rule: "Lock the drafter before drawing a straight, thin construction line.",
      actions: ["Slide the drafter head into the working area.", "Rotate the blade until it is horizontal.", "Lock the drafter in position.", "Draw the horizontal reference line."],
      tool: "DRAFTER · H PENCIL"
    },
    {
      title: "Locate centre O",
      description: "Measure the centre of the drawing area on the reference line, make a fine cross, and label it O.",
      why: "Every circle and radius in this construction must share the same centre.",
      instrument: "Drafter · H pencil",
      rule: "Mark a point with a fine cross; keep labels clear of construction lines.",
      actions: ["Locate the centre of the drawing area.", "Mark the centre with a fine cross.", "Write the label O beside the centre."],
      tool: "DRAFTER · H PENCIL"
    },
    {
      title: "Draw the outer circle",
      description: "Pick up the compass, set a wide radius, place its needle exactly at O, and rotate it smoothly through one full turn.",
      why: "The outer circle provides a guide for stepping off six equal compass divisions.",
      instrument: "Compass · H pencil",
      rule: "Keep the needle fixed at O and rotate the compass without changing its opening.",
      actions: ["Pick up and open the compass.", "Adjust its opening to the outer radius.", "Place the needle at O.", "Rotate the compass through 360°."],
      tool: "COMPASS"
    },
    {
      title: "Draw the inner circle",
      description: "Reduce the compass opening without moving its centre, then draw a second, concentric circle.",
      why: "The smaller concentric circle locates the six hexagon vertices. Their radius will equal one side of the final regular hexagon.",
      instrument: "Compass",
      rule: "Change only the compass radius; keep the needle at the original centre O.",
      actions: ["Keep the needle centred at O.", "Reduce the compass opening.", "Rotate the compass through one full turn."],
      tool: "COMPASS"
    },
    {
      title: "Draw the horizontal diameter",
      description: "Set the drafter horizontally through O and draw a light diameter from one side of the outer circle to the other.",
      why: "The diameter establishes a straight reference through the centre for the radial construction.",
      instrument: "Drafter · H pencil",
      rule: "Draw diameters through O and label their endpoints neatly.",
      actions: ["Set the drafter horizontally.", "Slide it until its edge passes through O.", "Lock the drafter.", "Draw the horizontal diameter.", "Mark and label its endpoints."],
      tool: "DRAFTER · H PENCIL"
    },
    {
      title: "Draw the vertical diameter",
      description: "Rotate the drafter blade by 90°, pass it through O, and draw the second diameter.",
      why: "Perpendicular diameters establish the axes used to orient and check the equal divisions.",
      instrument: "Drafter · H pencil",
      rule: "Use the drafter's right-angle movement to make the vertical diameter perpendicular to the horizontal one.",
      actions: ["Unlock the drafter.", "Rotate the blade through 90°.", "Align the blade through O and lock it.", "Draw the vertical diameter."],
      tool: "DRAFTER · H PENCIL"
    },
    {
      title: "Review the hexagon rule",
      description: "A regular hexagon has six equal sides. For a regular hexagon inscribed in a circle, the circumradius equals one side.",
      why: "Six equal compass steps divide the circle into six 60° sectors. The inner-circle radius is the side length of the hexagon drawn here.",
      instrument: "Compass · Drawing rule",
      rule: "For a regular hexagon, each central angle is 60° and side length equals circumradius.",
      actions: ["Pause to review the six-equal-sides rule.", "Compare a 60° sector with one hexagon side."],
      tool: "CONSTRUCTION RULE"
    },
    {
      title: "Step off six equal divisions",
      description: "Reset the compass to the outer-circle radius. Keep that opening unchanged as you step around the circle, placing the point at each new division and drawing each short arc separately.",
      why: "Restoring the outer radius makes each compass step exactly 60°. Repeating that unchanged span creates six equal divisions; the smaller circle still sets the hexagon's side length.",
      instrument: "Compass · H pencil",
      rule: "Do not alter the compass opening between arc placements; each new point must be the next intersection.",
      actions: [
        "Restore the compass opening to the outer-circle radius.",
        "Place the compass on the first outer-circle point.",
        "Draw the first short compass arc.",
        "Move to the new intersection and place the compass.",
        "Draw the second short compass arc.",
        "Move to the next intersection and place the compass.",
        "Draw the third short compass arc.",
        "Move to the next intersection and place the compass.",
        "Draw the fourth short compass arc.",
        "Move to the next intersection and place the compass.",
        "Draw the fifth short compass arc.",
        "Move to the next intersection and place the compass.",
        "Draw the sixth short compass arc and confirm six equal divisions."
      ],
      tool: "COMPASS"
    },
    {
      title: "Draw radii to the divisions",
      description: "Place the drafter through O and each outer division in turn. Draw six fine radial construction lines.",
      why: "The radii carry each outer-circle division inward to its matching point on the smaller circle.",
      instrument: "Drafter · H pencil",
      rule: "All radii must pass through the common centre O; draw them lightly.",
      actions: ["Align the drafter from O to outer division 1.", "Draw radius 1.", "Align and draw radius 2.", "Align and draw radius 3.", "Align and draw radius 4.", "Align and draw radius 5.", "Align and draw radius 6."],
      tool: "DRAFTER · H PENCIL"
    },
    {
      title: "Mark inner-circle vertices",
      description: "At each of the six intersections between a radius and the inner circle, make a fine point and label the vertices A through F.",
      why: "These six equally spaced inner-circle points are the vertices of the regular hexagon to be joined.",
      instrument: "H pencil · Divider",
      rule: "Place labels just outside the circle so they do not obscure points or edges.",
      actions: ["Mark inner intersection A.", "Mark inner intersection B.", "Mark inner intersection C.", "Mark inner intersection D.", "Mark inner intersection E.", "Mark inner intersection F."],
      tool: "H PENCIL · DIVIDER"
    },
    {
      title: "Join the six vertices",
      description: "Use a straight edge to join A–B, B–C, C–D, D–E, E–F, and F–A. Pause briefly after every side.",
      why: "Connecting adjacent, equally spaced vertices forms a closed regular hexagon.",
      instrument: "Drafter · H pencil",
      rule: "Join adjacent vertices in order; stop each line exactly at its endpoints.",
      actions: ["Align the drafter from A to B; draw AB and pause.", "Align from B to C; draw BC and pause.", "Align from C to D; draw CD and pause.", "Align from D to E; draw DE and pause.", "Align from E to F; draw EF and pause.", "Align from F to A; close the hexagon and pause."],
      tool: "DRAFTER · H PENCIL"
    },
    {
      title: "Keep the construction visible",
      description: "Leave the construction arcs and circles in place. They show how the vertices and equal divisions were found.",
      why: "The experiment does not require erasing the construction; visible light guidelines make the geometry verifiable.",
      instrument: "Eraser (not required)",
      rule: "Do not erase useful construction geometry unless the drawing specifically requires a clean presentation.",
      actions: ["Inspect the construction arcs and light guide circles.", "Leave all useful construction lines visible."],
      tool: "CONSTRUCTION CHECK"
    },
    {
      title: "Darken and verify",
      description: "Trace the six final sides firmly, darken the vertex labels, then check the completed construction.",
      why: "A clear difference in line weight separates the finished object from its light construction geometry.",
      instrument: "H pencil · Drafter",
      rule: "Keep the circles, radii and arcs light; use a bold, even line for the final hexagon.",
      actions: ["Increase pencil pressure and darken side AB.", "Darken side BC.", "Darken side CD.", "Darken side DE.", "Darken side EF.", "Darken side FA.", "Darken vertex labels and inspect the finished drawing."],
      tool: "H PENCIL · FINAL OUTLINE"
    }
  ];

  const pointsOn = (radius, index) => {
    const angle = -Math.PI / 2 + index * Math.PI / 3;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle), angle };
  };
  const elements = {
    overlay: document.getElementById("intro-overlay"),
    start: document.getElementById("start-experiment"),
    next: document.getElementById("next-step"),
    previous: document.getElementById("previous-step"),
    repeat: document.getElementById("repeat-step"),
    restart: document.getElementById("restart-experiment"),
    track: document.getElementById("step-track"),
    completion: document.getElementById("completion-panel"),
    action: document.getElementById("action-label"),
    actionBox: document.querySelector(".action-readout"),
    progress: document.getElementById("progress-fill"),
    timer: document.getElementById("elapsed-time"),
    stepCounter: document.getElementById("step-counter"),
    toolBadge: document.getElementById("tool-indicator"),
    activeTool: document.getElementById("active-tool")
  };
  const fields = {
    number: document.getElementById("step-number"),
    title: document.getElementById("step-title"),
    description: document.getElementById("step-description"),
    why: document.getElementById("step-why"),
    rule: document.getElementById("step-rule"),
    instrument: document.getElementById("step-instrument"),
    zoom: document.getElementById("zoom-label"),
    boardStatus: document.getElementById("board-status"),
    prompt: document.getElementById("next-prompt")
  };

  let currentStep = -1;
  let progress = 0;
  let completedSteps = 0;
  let isRunning = false;
  let startedAt = 0;
  let timerId = 0;
  let animationId = 0;

  function makeTrack() {
    elements.track.replaceChildren();
    steps.forEach((step, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "track-step";
      button.disabled = true;
      button.setAttribute("aria-label", `Step ${index + 1}: ${step.title}`);
      button.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><small>${step.title.replace(/^(Draw|Place|Align|Locate|Review|Step off|Mark|Join|Keep|Darken)/, "$1")}</small>`;
      button.addEventListener("click", () => {
        if (!isRunning && index < completedSteps) {
          currentStep = index;
          completedSteps = index;
          playCurrentStep();
        }
      });
      elements.track.append(button);
    });
    updateTrack();
  }

  function updateTrack() {
    [...elements.track.children].forEach((button, index) => {
      button.classList.toggle("done", index < completedSteps);
      button.classList.toggle("current", index === currentStep && currentStep >= 0);
      button.disabled = isRunning || index >= completedSteps;
    });
  }

  function ease(value) {
    return value * value * (3 - 2 * value);
  }

  function lineWithProgress(from, to, fraction, width, color, alpha = 1) {
    if (fraction <= 0) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(from.x + (to.x - from.x) * ease(Math.min(fraction, 1)), from.y + (to.y - from.y) * ease(Math.min(fraction, 1)));
    ctx.stroke();
    ctx.restore();
  }

  function drawSheet(amount) {
    if (amount <= 0) return;
    ctx.save();
    ctx.globalAlpha = ease(amount);
    ctx.shadowColor = "#273a3226";
    ctx.shadowBlur = 13;
    ctx.shadowOffsetY = 5;
    ctx.fillStyle = "#fffefa";
    ctx.fillRect(48, 35, 804, 548);
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "#e3e4dc";
    ctx.lineWidth = 1;
    ctx.strokeRect(48.5, 35.5, 803, 547);
    ctx.strokeStyle = "#eeeae0";
    ctx.strokeRect(62.5, 49.5, 775, 519);
    ctx.restore();
  }

  function drawText(text, x, y, size = 12, color = "#87938c", weight = "500", align = "left") {
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px "DM Sans", "Segoe UI", sans-serif`;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function drawPoint(point, radius, color, alpha = 1) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#fffefa";
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius + 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawCircle(radius, fraction, lineWidth = 1, alpha = 0.52, color = "#83918a") {
    if (fraction <= 0) return;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.min(fraction, 1));
    ctx.stroke();
    ctx.restore();
  }

  function drawDrafter(amount, angle = 0) {
    if (amount <= 0) return;
    const p = ease(amount);
    const startX = 112;
    const startY = 105;
    const targetX = 162;
    const targetY = cy - 45;
    const x = startX + (targetX - startX) * p;
    const y = startY + (targetY - startY) * p;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * p);
    ctx.fillStyle = "#769889";
    ctx.globalAlpha = .25;
    ctx.fillRect(-10, -5, 292, 10);
    ctx.globalAlpha = .85;
    ctx.fillStyle = "#9db4a8";
    ctx.fillRect(-10, -4, 292, 5);
    ctx.fillStyle = "#516e62";
    for (let tick = 0; tick < 15; tick++) ctx.fillRect(tick * 17, -3, 1, tick % 5 === 0 ? 3 : 1.5);
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function drawCompass(amount, phase = 0) {
    if (amount <= 0) return;
    const p = ease(amount);
    const point = pointsOn(outerRadius, Math.min(5, Math.floor(phase / 2)));
    const pivotX = cx + (point.x - cx) * (phase > 0 ? Math.min(.25, p * .25) : 0);
    const pivotY = cy + (point.y - cy) * (phase > 0 ? Math.min(.25, p * .25) : 0);
    const span = phase === -1 ? 174 * p : phase === -2 ? 112 * p : phase === 0 ? 174 * p : 112 * p;
    ctx.save();
    ctx.translate(pivotX, pivotY);
    ctx.rotate(phase < 0 ? -.32 + p * Math.PI * 2 : -.32 + p * .55 + phase * .18);
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#8e7455";
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(-span * .43, span * .72);
    ctx.moveTo(0, 5);
    ctx.lineTo(span * .43, span * .72);
    ctx.stroke();
    ctx.strokeStyle = "#b59c77";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-3, -5);
    ctx.lineTo(-span * .43, span * .72);
    ctx.moveTo(3, 5);
    ctx.lineTo(span * .43, span * .72);
    ctx.stroke();
    ctx.fillStyle = "#82694c";
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#6d7770";
    ctx.beginPath();
    ctx.moveTo(-span * .43 - 4, span * .72);
    ctx.lineTo(-span * .43 + 4, span * .72);
    ctx.lineTo(-span * .43, span * .72 + 13);
    ctx.fill();
    ctx.restore();
  }

  function divisionProgress() {
    const count = steps[8].actions.length;
    const fraction = stepFraction(8);
    const position = fraction * count;
    let divisions = 0;
    for (let index = 0; index < 6; index++) {
      const arcAction = 2 + index * 2;
      if (position >= arcAction + 1) divisions++;
      else if (position > arcAction) divisions += position - arcAction;
    }
    return divisions / 6;
  }

  function drawSteppingCompass() {
    if (!isRunning || currentStep !== 8) return;
    const actionPosition = progress * steps[8].actions.length;
    const actionIndex = Math.min(steps[8].actions.length - 1, Math.floor(actionPosition));
    const actionProgressValue = actionPosition - actionIndex;
    let vertexIndex = actionIndex < 2 ? 0 : Math.floor((actionIndex - 1) / 2);
    vertexIndex = Math.min(5, vertexIndex);
    let pivot = pointsOn(outerRadius, vertexIndex);
    if (actionIndex >= 3 && actionIndex % 2 === 1) {
      const previous = pointsOn(outerRadius, vertexIndex - 1);
      pivot = {
        x: previous.x + (pivot.x - previous.x) * ease(actionProgressValue),
        y: previous.y + (pivot.y - previous.y) * ease(actionProgressValue)
      };
    }
    const angle = actionIndex >= 3 && actionIndex % 2 === 0 ? actionProgressValue * Math.PI * 2 : 0;
    ctx.save();
    ctx.translate(pivot.x - cx, pivot.y - cy);
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.globalAlpha = .9;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#8e7455";
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(-outerRadius * .43, outerRadius * .72);
    ctx.moveTo(0, 5);
    ctx.lineTo(outerRadius * .43, outerRadius * .72);
    ctx.stroke();
    ctx.restore();
  }

  function drawPencil(amount, from, to, angle) {
    if (amount <= 0) return;
    const p = ease(amount);
    const x = from.x + (to.x - from.x) * p;
    const y = from.y + (to.y - from.y) * p;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.lineCap = "round";
    ctx.lineWidth = 7;
    ctx.strokeStyle = "#bf9b6a";
    ctx.beginPath();
    ctx.moveTo(-26, 0);
    ctx.lineTo(17, 0);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#e3c99f";
    ctx.beginPath();
    ctx.moveTo(-23, -2);
    ctx.lineTo(15, -2);
    ctx.stroke();
    ctx.fillStyle = "#615745";
    ctx.beginPath();
    ctx.moveTo(17, -3);
    ctx.lineTo(17, 3);
    ctx.lineTo(25, 0);
    ctx.fill();
    ctx.restore();
  }

  function stepFraction(index) {
    if (index < currentStep) return 1;
    if (index > currentStep || currentStep < 0) return 0;
    return progress;
  }

  function actionProgress(stepIndex, actionIndex) {
    const fraction = stepFraction(stepIndex);
    const count = steps[stepIndex].actions.length;
    return Math.max(0, Math.min(1, fraction * count - actionIndex));
  }

  function drawReferenceLine(amount) {
    const y = cy;
    lineWithProgress({ x: 138, y }, { x: 762, y }, amount, 1.1, "#a2aaa4", .43);
  }

  function drawAxes(horizontal, vertical) {
    if (horizontal > 0) {
      const y = cy;
      lineWithProgress({ x: cx - outerRadius, y }, { x: cx + outerRadius, y }, horizontal, 1.05, "#84928a", .4);
      if (horizontal >= 1) {
        drawText("X", cx + outerRadius + 9, y, 10, "#7c8982", "600");
        drawText("X′", cx - outerRadius - 13, y, 10, "#7c8982", "600");
      }
    }
    if (vertical > 0) {
      lineWithProgress({ x: cx, y: cy - outerRadius }, { x: cx, y: cy + outerRadius }, vertical, 1.05, "#84928a", .4);
      if (vertical >= 1) {
        drawText("Y", cx + 10, cy - outerRadius - 12, 10, "#7c8982", "600");
        drawText("Y′", cx + 10, cy + outerRadius + 13, 10, "#7c8982", "600");
      }
    }
  }

  function drawOuterPointsAndArcs(fraction) {
    const count = 6;
    const active = fraction * count;
    for (let index = 0; index < count; index++) {
      const amount = Math.max(0, Math.min(1, active - index));
      if (amount <= 0) continue;
      const point = pointsOn(outerRadius, index);
      const arcRadius = 20;
      const start = point.angle + Math.PI * .72;
      const end = start + Math.PI * .82 * amount;
      ctx.save();
      ctx.strokeStyle = "#929f98";
      ctx.lineWidth = 1.15;
      ctx.globalAlpha = .7;
      ctx.beginPath();
      ctx.arc(point.x, point.y, arcRadius, start, end);
      ctx.stroke();
      ctx.restore();
      drawPoint(point, 2.1, "#71837a", Math.min(1, amount * 3));
    }
  }

  function drawRadii(fraction) {
    for (let index = 0; index < 6; index++) {
      const amount = Math.max(0, Math.min(1, fraction * 6 - index));
      if (amount <= 0) continue;
      const outer = pointsOn(outerRadius, index);
      lineWithProgress({ x: cx, y: cy }, outer, amount, 1, "#8e9a93", .48);
    }
  }

  function drawInnerMarks(fraction, dark = false) {
    const active = fraction * 6;
    for (let index = 0; index < 6; index++) {
      const amount = Math.max(0, Math.min(1, active - index));
      if (amount <= 0) continue;
      const point = pointsOn(innerRadius, index);
      drawPoint(point, dark ? 3.2 : 2.5, dark ? "#364b45" : "#65796f", amount);
      if (amount >= 1) {
        const offset = 11;
        const lx = point.x + Math.cos(point.angle) * offset;
        const ly = point.y + Math.sin(point.angle) * offset;
        drawText(String.fromCharCode(65 + index), lx, ly, dark ? 12 : 11, dark ? "#293c36" : "#64766d", "700", "center");
      }
    }
  }

  function drawRadials(fraction) {
    for (let index = 0; index < 6; index++) {
      const amount = Math.max(0, Math.min(1, fraction * 6 - index));
      if (amount <= 0) continue;
      const point = pointsOn(outerRadius, index);
      lineWithProgress({ x: cx, y: cy }, point, amount, 1, "#87958d", .52);
    }
  }

  function drawHexSides(fraction, darken = false) {
    for (let index = 0; index < 6; index++) {
      const amount = Math.max(0, Math.min(1, fraction * 6 - index));
      if (amount <= 0) continue;
      const start = pointsOn(innerRadius, index);
      const end = pointsOn(innerRadius, (index + 1) % 6);
      lineWithProgress(start, end, amount, darken ? 3.3 : 1.8, darken ? "#243d34" : "#3f6557", darken ? 1 : .86);
    }
  }

  function drawCenterAndLabel(centerAmount, labelAmount) {
    if (centerAmount > 0) {
      ctx.save();
      ctx.globalAlpha = centerAmount;
      ctx.strokeStyle = "#53685d";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(cx - 5, cy - 5);
      ctx.lineTo(cx + 5, cy + 5);
      ctx.moveTo(cx + 5, cy - 5);
      ctx.lineTo(cx - 5, cy + 5);
      ctx.stroke();
      ctx.restore();
    }
    if (labelAmount > 0) drawText("O", cx + 12, cy - 11, 12, "#65756d", "600");
  }

  function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const place = stepFraction(0);
    drawSheet(place);
    if (place <= 0) return;

    const activeStep = currentStep;
    const zoom = activeStep === 3 || activeStep === 4 || activeStep === 8 || activeStep === 10 || activeStep === 11 ? 1.045 : 1;
    fields.zoom.textContent = `BOARD VIEW · ${Math.round(zoom * 100)}%`;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(zoom, zoom);
    ctx.translate(-cx, -cy);

    const reference = actionProgress(1, 3);
    const centerProgress = actionProgress(2, 1);
    const centerLabel = actionProgress(2, 2);
    const outerCircle = actionProgress(3, 3);
    const innerCircle = actionProgress(4, 2);
    const horizontal = actionProgress(5, 3);
    const vertical = actionProgress(6, 3);
    const divisions = divisionProgress();
    const radii = stepFraction(9) >= 1 ? 1 : stepFraction(9) * 7;
    const vertexMarks = stepFraction(10) >= 1 ? 1 : stepFraction(10) * 6;
    const sides = stepFraction(11) >= 1 ? 1 : stepFraction(11) * 6;
    const darken = stepFraction(13) >= 1 ? 1 : stepFraction(13) * 7;

    drawReferenceLine(reference);
    drawCenterAndLabel(centerProgress, centerLabel);
    drawCircle(outerRadius, outerCircle, 1.2, .43);
    drawCircle(innerRadius, innerCircle, 1.15, .42);
    drawAxes(horizontal, vertical);
    drawOuterPointsAndArcs(divisions);
    drawRadials(radii);
    drawInnerMarks(vertexMarks);
    drawHexSides(sides, false);
    drawHexSides(darken, true);
    if (reference >= 1) drawDrafter(1, (activeStep === 6 && isRunning) ? -Math.PI / 2 * progress : 0);
    if (activeStep === 3 && isRunning) drawCompass(progress, -1);
    if (activeStep === 4 && isRunning) drawCompass(progress, -2);
    if ((activeStep === 5 || activeStep === 6 || activeStep === 9 || activeStep === 11 || activeStep === 13) && isRunning) {
      const movingFrom = activeStep === 9 ? { x: cx - 120, y: cy - 145 } : { x: cx - 185, y: cy + 180 };
      const movingTo = activeStep === 11 ? pointsOn(innerRadius, Math.min(5, Math.floor(progress * 6))) : pointsOn(outerRadius, Math.min(5, Math.floor(progress * 6)));
      drawPencil(progress, movingFrom, movingTo, -.7);
    }
    drawSteppingCompass();
    drawCenterAndLabel(centerProgress, centerLabel);
    drawInnerMarks(activeStep >= 13 ? 1 : vertexMarks, darken >= 1);
    ctx.restore();
    fields.boardStatus.textContent = isRunning ? "DEMONSTRATION IN PROGRESS" : completedSteps === steps.length ? "CONSTRUCTION COMPLETE" : "GUIDED DRAWING BOARD";
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  }

  function updateTimer() {
    if (!startedAt) return;
    const elapsed = Math.floor((Date.now() - startedAt) / 1000);
    elements.timer.textContent = formatTime(elapsed);
    if (completedSteps === steps.length) document.getElementById("time-stat").textContent = formatTime(elapsed);
  }

  function setActionLabel() {
    const step = steps[currentStep];
    const actionIndex = Math.min(step.actions.length - 1, Math.floor(progress * step.actions.length));
    elements.action.textContent = isRunning ? step.actions[actionIndex] : completedSteps === steps.length ? "Construction checked. Your drawing is complete." : "Step complete. Continue when you are ready.";
    elements.actionBox.classList.toggle("running", isRunning);
    elements.toolBadge.classList.toggle("active", isRunning);
    elements.activeTool.textContent = isRunning ? step.tool : completedSteps === steps.length ? "FINAL DRAWING COMPLETE" : step.tool;
  }

  function updateLesson() {
    const step = steps[currentStep];
    fields.number.textContent = `${String(currentStep + 1).padStart(2, "0")} / ${steps.length}`;
    fields.title.textContent = step.title;
    fields.description.textContent = step.description;
    fields.why.textContent = step.why;
    fields.rule.textContent = step.rule;
    fields.instrument.textContent = step.instrument;
    document.getElementById("note-heading").textContent = currentStep === 7 ? "Why this works" : "Why this step";
    fields.prompt.textContent = isRunning ? "Watch the movement; every action is shown." : completedSteps === steps.length ? "All construction checks passed." : "Proceed to the next step when ready.";
    elements.stepCounter.textContent = `STEP ${String(currentStep + 1).padStart(2, "0")} OF ${steps.length}`;
    elements.progress.style.width = `${(completedSteps / steps.length) * 100}%`;
    elements.next.disabled = isRunning || completedSteps === steps.length;
    elements.previous.disabled = isRunning || currentStep <= 0;
    elements.repeat.disabled = isRunning || currentStep < 0;
    updateTrack();
    setActionLabel();
  }

  function paintFrame() {
    drawScene();
    setActionLabel();
  }

  function playCurrentStep() {
    if (currentStep < 0 || currentStep >= steps.length) return;
    cancelAnimationFrame(animationId);
    isRunning = true;
    progress = 0;
    updateLesson();
    const started = performance.now();
    const stepDuration = Math.max(1150, steps[currentStep].actions.length * duration);

    function frame(now) {
      progress = Math.min(1, (now - started) / stepDuration);
      paintFrame();
      if (progress < 1) {
        animationId = requestAnimationFrame(frame);
        return;
      }
      isRunning = false;
      progress = 1;
      completedSteps = Math.max(completedSteps, currentStep + 1);
      paintFrame();
      updateLesson();
      if (completedSteps === steps.length) showCompletion();
    }

    animationId = requestAnimationFrame(frame);
  }

  function beginExperiment() {
    if (startedAt) return;
    startedAt = Date.now();
    timerId = window.setInterval(updateTimer, 1000);
    elements.overlay.classList.add("dismissed");
    currentStep = 0;
    playCurrentStep();
  }

  function showCompletion() {
    const checklist = [
      "Outer construction circle exists",
      "Inner construction circle exists",
      "Both circles share centre O",
      "Six equal divisions are marked",
      "All six sides have equal length",
      "Vertices are connected in order",
      "Vertex labels A–F are visible",
      "Final hexagon is darkened; guides stay light"
    ];
    document.getElementById("verification-list").replaceChildren(...checklist.map((label) => {
      const item = document.createElement("div");
      item.className = "verification-item";
      const tick = document.createElement("span");
      tick.textContent = "✓";
      item.append(tick, document.createTextNode(label));
      return item;
    }));
    document.getElementById("accuracy-stat").textContent = "100%";
    document.getElementById("score-stat").textContent = "100 / 100";
    document.getElementById("marks-stat").textContent = "10 / 10";
    updateTimer();
    elements.completion.hidden = false;
    elements.completion.scrollIntoView({ behavior: "smooth", block: "nearest" });
    fields.boardStatus.textContent = "CONSTRUCTION COMPLETE";
    elements.activeTool.textContent = "FINAL DRAWING COMPLETE";
    window.clearInterval(timerId);
  }

  function restartExperiment() {
    cancelAnimationFrame(animationId);
    window.clearInterval(timerId);
    isRunning = false;
    startedAt = 0;
    currentStep = -1;
    progress = 0;
    completedSteps = 0;
    elements.timer.textContent = "00:00";
    elements.completion.hidden = true;
    elements.overlay.classList.remove("dismissed");
    elements.stepCounter.textContent = "READY TO BEGIN";
    elements.progress.style.width = "0%";
    fields.number.textContent = "— / 14";
    fields.title.textContent = "Your practical starts here";
    fields.description.textContent = "Start the experiment to see the drawing sheet and instruments placed on the board.";
    fields.why.textContent = "Keep construction lines light. Final outlines will be darkened only after the construction is complete.";
    fields.rule.textContent = "Use a sharp H pencil for thin, clean construction lines.";
    fields.instrument.textContent = "Ready for the practical";
    fields.prompt.textContent = "The demonstration begins when you press Start.";
    elements.action.textContent = "Click Start experiment when you are ready.";
    elements.actionBox.classList.remove("running");
    elements.toolBadge.classList.remove("active");
    elements.activeTool.textContent = "INSTRUMENTS READY";
    fields.boardStatus.textContent = "PRACTICAL PREVIEW";
    fields.zoom.textContent = "BOARD VIEW · 100%";
    elements.next.disabled = true;
    elements.previous.disabled = true;
    elements.repeat.disabled = true;
    updateTrack();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  elements.next.addEventListener("click", () => {
    if (isRunning || currentStep < 0 || currentStep >= steps.length - 1) return;
    currentStep++;
    playCurrentStep();
  });
  elements.previous.addEventListener("click", () => {
    if (isRunning || currentStep <= 0) return;
    currentStep--;
    completedSteps = currentStep;
    playCurrentStep();
  });
  elements.repeat.addEventListener("click", () => {
    if (!isRunning && currentStep >= 0) playCurrentStep();
  });
  elements.start.addEventListener("click", beginExperiment);
  elements.restart.addEventListener("click", restartExperiment);
  document.getElementById("restart-from-completion").addEventListener("click", restartExperiment);
  document.getElementById("replay-animation").addEventListener("click", () => {
    restartExperiment();
    beginExperiment();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.getElementById("download-pdf").addEventListener("click", () => window.print());

  makeTrack();
})();

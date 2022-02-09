function runAgent(wind, targetPosition, bananaHitPosition) {
  if (agent_2_memory.lastThrow === undefined) {
    agent_2_angle = 70;
    var min = 10;
    agent_2_force = Math.floor(Math.random() * (50 - min)) + min;
  } else {
      var deltaPosition = targetPosition[0] - bananaHitPosition[0];
      agent_2_force += deltaPosition * 0.05;
  }
  agent_2_memory.lastThrow = {
    angle: agent_2_angle,
    force: agent_2_force,
    forceDelta: 40,
  };
}

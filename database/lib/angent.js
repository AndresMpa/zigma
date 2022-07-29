module.exports = function setupAgent(AgentModel) {
  function findAll() {
    return AgentModel.findAll();
  }
  function findById(agentId) {
    AgentModel.findById(agentId);
  }

  function findByUuid(uuid) {
    return AgentModel.findOne({
      where: { uuid },
    });
  }
  function findByConnected() {
    return AgentModel.findAll({
      where: { connected: true },
    });
  }
  function findByUsername(username) {
    return AgentModel.findAll({
      where: {
        username,
        connected: true,
      },
    });
  }
  async function createOrUpdate(agent) {
    const condition = {
      where: {
        uuid: agent.uuid,
      },
    };

    const existingAgent = await AgentModel.findOne(condition);

    if (existingAgent) {
      const updated = await AgentModel.update(agent, condition);
      return updated ? AgentModel.findOne(condition) : existingAgent;
    }

    const result = await AgentModel.create(agent);
    return result.toJSON();
  }

  return {
    findAll,
    findById,
    findByUuid,
    findByUsername,
    findByConnected,
    createOrUpdate,
  };
};

function setupMetric(MetricModel, AgentModel) {
  async function create(uuid, metric) {
    // SELECT uuid FROM AgentModel WHERE agent.uuid == uuid
    const agent = await AgentModel.findOne({
      where: { uuid },
    });

    if (agent) {
      metric.agentId = agent.id;
      const result = await MetricModel.create(metric);
      return result.toJSON();
    }
  }

  async function findByAgentUUID(uuid) {
    return MetricModel.findAll({
      // SELECT type FROM MetricModel
      attributes: ['type'],
      // GROUP BY type
      group: ['type'],
      // JOIN AgentModel WHERE agent.uuid == uuid
      include: [
        {
          attributes: [],
          model: AgentModel,
          where: {
            uuid,
          },
        },
      ],
      raw: true,
    });
  }

  async function findByTypeAgentUUID(type, uuid) {
    return MetricModel.findAll({
      //SELECT id, type, value, createdAt FROM MetricModel
      attributes: ['id', 'type', 'value', 'createdAt'],
      // WHERE type == type
      where: {
        type,
      },
      // LIMIT 20
      limit: 20,
      // ORDER BY createdAt DESC
      order: [['createdAt', 'DESC']],
      // JOIN AgentModel WHERE agent.uuid == uuid
      include: [
        {
          attributes: [],
          model: AgentModel,
          where: {
            uuid,
          },
        },
      ],
      raw: true,
    });
  }

  return {
    create,
    findByAgentUUID,
    findByTypeAgentUUID,
  };
}

module.exports = setupMetric;

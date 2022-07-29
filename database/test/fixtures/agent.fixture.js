const agent = {
  id: 1,
  pid: 0,
  uuid: '000-000-111',
  name: 'James Bomb',
  username: '007',
  hostname: 'Nevermind',
  connected: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const agents = [
  agent,
  {
    ...agent,
    id: 2,
    uuid: 'yyy-yyy-yyy',
    connected: false,
    username: 'agentFixY',
  },
  {
    ...agent,
    id: 3,
    uuid: 'zzz-zzz-zzz',
    name: 'Snorlax',
    username: 'Sleepy',
  },
];

module.exports = {
  all: agents,
  single: agent,
  connected: agents.filter((agent) => agent.connected),
  findOne: (username) => agents.filter((agent) => agent.username === username),
  byUuid: (uuid) => agents.find((agent) => agent.uuid === uuid),
  byId: (id) => agents.find((agent) => agent.id === id),
};

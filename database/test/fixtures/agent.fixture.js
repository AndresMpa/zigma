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
  {
    ...agent,
    id: 4,
    uuid: 'wer-fas-fzx',
    name: 'Mr. X',
    username: 'Mr. X',
  },
  {
    ...agent,
    id: 5,
    uuid: 'asd-cwk-ppy',
    name: 'Jhon Smow',
    username: 'Snowman',
  },
  {
    ...agent,
    id: 6,
    uuid: 'lra-zke-lmo',
    name: 'Carlo Mangnanimo',
    username: 'MagnoXVI',
  },
];

module.exports = {
  all: agents,
  single: agent,
  connected: agents.filter((agent) => agent.connected),
  findOne: (username) => agents.filter((agent) => agent.username === username),
  byUuid: (uuid) => agents.find((agent) => agent.uuid === uuid),
  byId: (id) => agents.find((agent) => agent.id === id),
  getASample: () => {
    return {
      ...agent,
      id: 8,
      name: 'pas damour familier',
      uuid: 'samp-leno-twoo',
      username: 'MagnoXVI',
    };
  },
};

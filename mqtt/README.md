# MQTT module

## `agent/connected`

```js
{
  agent: {
    uuid,     // Auto generated
    username, // Defined by config
    name,     // Defined by config
    hostname, // Get from OS
    pid;      // Get from OS process
  }
}
```

## `agent/disconnected`

```js
{
  agent: {
    uuid;     // Genetared on agent table
  }
}
```

## `agent/message`

```js
{
  agent,      // Metric owner
  metrics: [  // Data from sensors
    {
      type,
      value
    }
  ],
  timestamp   // Generated while message creation
}
```

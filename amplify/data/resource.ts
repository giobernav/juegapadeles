import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a
  .schema({
    PrivacySetting: a.enum(["PRIVATE", "FRIENDS_ONLY", "PUBLIC"]),
    Gender: a.enum(["MALE", "FEMALE", "UND"]),
    Hand: a.enum(["LEFT", "RIGHT", "BOTH"]),
    Level: a.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
    Side: a.enum(["HOME", "AWAY"]),
    Location: a.customType({
      lat: a.float(),
      lng: a.float(),
    }),
    Address: a.customType({
      description: a.string(),
      country: a.string(),
      postalCode: a.string(),
    }),

    Todo: a.model({
      content: a.string(),
    }),
    Player: a.model({
      phone: a.phone().required(),
      usename: a.string().required(),
      name: a.string(),
      lastName: a.string(),
      gender: a.ref("Gender"),
      privacy: a.ref("PrivacySetting"),
      preferences: a.hasOne("PlayerPreference", "playerId"),
      stats: a.hasOne("PlayerStats", "playerId"),
      friends: a.hasMany("Friend", "playerId"),
      blocked: a.hasMany("Blocked", "playerId"),
      participant: a.hasOne("Participant", "playerId"),
    }),
    PlayerPreference: a.model({
      hand: a.ref("Hand"),
      level: a.ref("Level"),
      location: a.ref("Location"),
      radius: a.integer(),
      availability: a.json(),
      omitMoreBlockedUsers: a.boolean().default(false),
      playerId: a.id(),
      player: a.belongsTo("Player", "playerId"),
    }),
    PlayerStats: a.model({
      matches: a.integer().default(0),
      win: a.integer().default(0),
      loss: a.integer().default(0),
      draw: a.integer().default(0),
      withoutRes: a.integer().default(0),
      last5: a.string(),
      playerId: a.id(),
      player: a.belongsTo("Player", "playerId"),
    }),
    Friend: a.model({
      isRegularPartner: a.boolean().default(false),
      playerId: a.id(),
      player: a.belongsTo("Player", "playerId"),
    }),
    Blocked: a.model({
      playerId: a.id(),
      player: a.belongsTo("Player", "playerId"),
      reason: a.string(),
    }),
    Advertisement: a.model({
      title: a.string().required(),
      description: a.string(),
      privacy: a.ref("PrivacySetting"),
      location: a.ref("Location"),
      address: a.ref("Address"),
      datetime: a.timestamp().required(),
      hasConfirmedCourt: a.boolean(),
      level: a.ref("Level").array(),
      isStrictLevel: a.boolean(),
      status: a.enum(["DRAFT", "ACTIVE", "CANCELLED", "COMPLETED"]),
      price: a.integer().default(0),
      participants: a.hasMany("Participant", "advertisementId"),
      match: a.hasOne("Match", "advertisementId"),
    }),
    Participant: a.model({
      side: a.ref("Side"),
      status: a.enum(["PENDING", "CONFIRMED"]),
      advertisementId: a.id(),
      advertisement: a.belongsTo("Advertisement", "advertisementId"),
      playerId: a.id(),
      player: a.belongsTo("Player", "playerId"),
    }),
    Match: a.model({
      datetime: a.timestamp().required(),
      startTime: a.time(),
      endTime: a.time(),
      status: a.enum(["PENDING", "LIVE", "FINISHED", "IDLE"]),
      score: a.string(),
      winner: a.enum(["HOME", "AWAY", "DRAW", "NO_RESULT"]),
      advertisementId: a.id(),
      advertisement: a.belongsTo("Advertisement", "advertisementId"),
    }),
  })
  .authorization((allow) => [
    allow.owner(),
    allow.authenticated("identityPool").to(["read"]),
    allow.guest().to(["read"]),
  ]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>

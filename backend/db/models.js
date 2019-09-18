const { Schema } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const User = new Schema({
  _id: { type: String, alias: 'nickname' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  surname: String,
  division: { type: String, ref: 'Division', required: true },
  teams: [{ type: ObjectId, ref: 'Team' }],
  statistics: {
    matches: {
      won: Number,
      lost: Number,
    },
    goals: {
      for: Number,
      against: Number,
    },
  },
});

const Team = new Schema({
  name: { type: String, required: true },
  players: {
    first: { type: String, ref: 'User', required: true },
    second: { type: String, ref: 'User', required: true },
  },
  status: { type: String, required: true, enum: ['active', 'deleted'] },
  leagues: [{ type: ObjectId, ref: 'League' }],
  statistics: {
    matches: {
      won: Number,
      lost: Number,
    },
    goals: {
      for: Number,
      against: Number,
    },
  },
});

const Division = new Schema({
  _id: { type: String, alias: 'name' },
  description: String,
  leagues: [{ type: ObjectId, ref: 'League' }],
});

const League = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  division: { type: String, ref: 'Division', required: true },
  numOfTeams: {
    min: { type: Number },
    max: { type: Number },
  },
  teams: [
    {
      team: { type: ObjectId, ref: 'Team', required: true, unique: true },
      points: { type: Number, required: true, default: 0 },
    },
  ],
  status: { type: String, required: true, enum: ['created', 'pending', 'closed'] },
  date: {
    created: { type: Date, default: Date.now },
    started: { type: Date, required: true },
    closed: Date,
  },
  matches: [{ type: ObjectId, ref: 'Match' }],
});

const Match = new Schema({
  teams: {
    first: { type: ObjectId, ref: 'Team', required: true },
    second: { type: ObjectId, ref: 'Team', required: true },
  },
  status: { type: String, required: true, enum: ['scheduled', 'played'] },
  date: {
    scheduled: { type: Date, required: true },
    played: Date,
  },
  winner: { type: String, enum: ['first', 'second'] },
  goals: {
    first: Number,
    second: Number,
  },
});

module.exports = { User, Team, Division, League, Match };

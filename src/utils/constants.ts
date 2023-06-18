import { DBProvider } from "../lib/enums";

export default {
    CloudProvider: DBProvider.FIREBASE,
    Models: {
      Tasks: 'tasks'
    }
  } as const;
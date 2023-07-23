import { syncDbModels } from "src/db/connection";

import getAllActions from "./getAllActions";

const run = async () => {
  console.log(`Wakey wakey sunshine`);
  await syncDbModels();

  const { actions } = await getAllActions();
  console.log("--- actions");
  console.log(actions);

  // Pull data  for the past hour

  // Check if a trigger has been hit

  return actions;
};

run()
  .catch((e) => {
    console.error("\nScript failed.\n");
    console.error(e);
  })
  .finally(async () => {
    console.log("Nighty night gn");
  });

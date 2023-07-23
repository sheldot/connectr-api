import Action from "src/db/models/Action.model";

import { IActionDTO } from "./_.dto";

interface ResponseDTO {
  actions: IActionDTO[];
}

const getAllActions = async () => {
  const actions = (await Action.findAll({})).map((a) => a.toJSON());

  const response: ResponseDTO = {
    actions: actions.map(
      ({
        createdAt,
        deletedAt,
        updatedAt,
        id,
        actionType,
        actionPayload,
        address,
        name,
        operator,
        threshold,
        endpointId,
        fieldId,
      }) => ({
        createdAt: createdAt.toISOString(),
        deletedAt: deletedAt?.toISOString(),
        updatedAt: updatedAt.toISOString(),
        id,
        actionType,
        actionPayload,
        address,
        name,
        operator,
        threshold,
        endpointId,
        fieldId,
      })
    ),
  };

  return response;
};

export default getAllActions;

import statusDto from './status-dto.json'
import createStatusRequest from './create-status.json';
import createStatusResponse from './create-status-response.json';
import findStatusesRequest from './find-status-request.json';
import findStatusesResponse from './find-status-response.json';
import updateStatusRequest from './update-status-request.json';
import updateStatusResponse from './update-status-response.json';
import deleteStatusRequest from './delete-status-request.json';
import deleteStatusResponse from './delete-status-respo.json'

export const swaggerStatusSchemas = {
    StatusDTO: statusDto.definitions.StatusDto,
    CreateStatusRequest: createStatusRequest.definitions.CreateStatusDTO,
    CreateStatusResponse: createStatusResponse.definitions.CreateStatusResponseDTO,
    FindStatusesRequest: findStatusesRequest.definitions.FindStatusesDTO,
    FindStatusesResponse: findStatusesResponse.definitions.FindStatusesResponseDTO,
    UpdateStatusRequest: updateStatusRequest.definitions.UpdateStatusDTO,
    UpdateStatusResponse: updateStatusResponse.definitions.UpdateStatusResponseDTO,
    DeleteStatusRequest: deleteStatusRequest.definitions.DeleteStatusDTO,
    DeleteStatusResponse: deleteStatusResponse.definitions.DeleteStatusResponseDTO,
};
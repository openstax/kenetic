/* tslint:disable */
/* eslint-disable */
/**
 * OpenStax Labs API
 * The labs API for OpenStax.  Requests to this API should include `application/json` in the `Accept` header.  The desired API version is specified in the request URL, e.g. `[domain]/api/v0/researcher/studies`. While the API does support a default version, that version will change over time and therefore should not be used in production code! 
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    Launch,
    LaunchFromJSON,
    LaunchToJSON,
    NewStage,
    NewStageFromJSON,
    NewStageToJSON,
    NewStudy,
    NewStudyFromJSON,
    NewStudyToJSON,
    ParticipantStudies,
    ParticipantStudiesFromJSON,
    ParticipantStudiesToJSON,
    ParticipantStudy,
    ParticipantStudyFromJSON,
    ParticipantStudyToJSON,
    Stage,
    StageFromJSON,
    StageToJSON,
    StageUpdate,
    StageUpdateFromJSON,
    StageUpdateToJSON,
    Studies,
    StudiesFromJSON,
    StudiesToJSON,
    Study,
    StudyFromJSON,
    StudyToJSON,
    StudyUpdate,
    StudyUpdateFromJSON,
    StudyUpdateToJSON,
} from '../models';

export interface AddResearcherToStudyRequest {
    studyId: string;
    userId: string;
}

export interface AddStageRequest {
    id: number;
    stage: NewStage;
}

export interface AddStudyRequest {
    study: NewStudy;
}

export interface DeleteStageRequest {
    id: number;
}

export interface GetParticipantStudyRequest {
    id: string;
}

export interface GetStageRequest {
    id: number;
}

export interface LandStudyRequest {
    id: string;
}

export interface LaunchStudyRequest {
    id: string;
}

export interface RemoveResearcherFromStudyRequest {
    studyId: string;
    userId: string;
}

export interface UpdateStageRequest {
    id: number;
    stage: StageUpdate;
}

export interface UpdateStudyRequest {
    id: number;
    study: StudyUpdate;
}

/**
 * 
 */
export class StudiesApi extends runtime.BaseAPI {

    /**
     * Add a researcher to a study
     * Add a researcher to a study
     */
    async addResearcherToStudyRaw(requestParameters: AddResearcherToStudyRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.studyId === null || requestParameters.studyId === undefined) {
            throw new runtime.RequiredError('studyId','Required parameter requestParameters.studyId was null or undefined when calling addResearcherToStudy.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling addResearcherToStudy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/researcher/studies/{study_id}/researcher/{user_id}`.replace(`{${"study_id"}}`, encodeURIComponent(String(requestParameters.studyId))).replace(`{${"user_id"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Add a researcher to a study
     * Add a researcher to a study
     */
    async addResearcherToStudy(requestParameters: AddResearcherToStudyRequest): Promise<void> {
        await this.addResearcherToStudyRaw(requestParameters);
    }

    /**
     * Add a stage to study
     * Add a stage to a study
     */
    async addStageRaw(requestParameters: AddStageRequest): Promise<runtime.ApiResponse<Stage>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling addStage.');
        }

        if (requestParameters.stage === null || requestParameters.stage === undefined) {
            throw new runtime.RequiredError('stage','Required parameter requestParameters.stage was null or undefined when calling addStage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/researcher/studies/{id}/stages`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NewStageToJSON(requestParameters.stage),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => StageFromJSON(jsonValue));
    }

    /**
     * Add a stage to study
     * Add a stage to a study
     */
    async addStage(requestParameters: AddStageRequest): Promise<Stage> {
        const response = await this.addStageRaw(requestParameters);
        return await response.value();
    }

    /**
     * Add a study
     * Add a study
     */
    async addStudyRaw(requestParameters: AddStudyRequest): Promise<runtime.ApiResponse<Study>> {
        if (requestParameters.study === null || requestParameters.study === undefined) {
            throw new runtime.RequiredError('study','Required parameter requestParameters.study was null or undefined when calling addStudy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/researcher/studies`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NewStudyToJSON(requestParameters.study),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => StudyFromJSON(jsonValue));
    }

    /**
     * Add a study
     * Add a study
     */
    async addStudy(requestParameters: AddStudyRequest): Promise<Study> {
        const response = await this.addStudyRaw(requestParameters);
        return await response.value();
    }

    /**
     * Delete a stage
     * Delete a stage
     */
    async deleteStageRaw(requestParameters: DeleteStageRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteStage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/researcher/stages/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete a stage
     * Delete a stage
     */
    async deleteStage(requestParameters: DeleteStageRequest): Promise<void> {
        await this.deleteStageRaw(requestParameters);
    }

    /**
     * Get studies for the calling researcher. 
     * Get studies (available and completed) for the participant
     */
    async getParticipantStudiesRaw(): Promise<runtime.ApiResponse<ParticipantStudies>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/participant/studies`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ParticipantStudiesFromJSON(jsonValue));
    }

    /**
     * Get studies for the calling researcher. 
     * Get studies (available and completed) for the participant
     */
    async getParticipantStudies(): Promise<ParticipantStudies> {
        const response = await this.getParticipantStudiesRaw();
        return await response.value();
    }

    /**
     * Get participant-visible info for a study
     * Get participant-visible info for a study
     */
    async getParticipantStudyRaw(requestParameters: GetParticipantStudyRequest): Promise<runtime.ApiResponse<ParticipantStudy>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getParticipantStudy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/participant/studies/:id`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ParticipantStudyFromJSON(jsonValue));
    }

    /**
     * Get participant-visible info for a study
     * Get participant-visible info for a study
     */
    async getParticipantStudy(requestParameters: GetParticipantStudyRequest): Promise<ParticipantStudy> {
        const response = await this.getParticipantStudyRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get a stage
     * Get a stage
     */
    async getStageRaw(requestParameters: GetStageRequest): Promise<runtime.ApiResponse<Stage>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getStage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/researcher/stages/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => StageFromJSON(jsonValue));
    }

    /**
     * Get a stage
     * Get a stage
     */
    async getStage(requestParameters: GetStageRequest): Promise<Stage> {
        const response = await this.getStageRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get studies for the calling researcher. 
     * Get studies for the calling researcher
     */
    async getStudiesRaw(): Promise<runtime.ApiResponse<Studies>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/researcher/studies`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => StudiesFromJSON(jsonValue));
    }

    /**
     * Get studies for the calling researcher. 
     * Get studies for the calling researcher
     */
    async getStudies(): Promise<Studies> {
        const response = await this.getStudiesRaw();
        return await response.value();
    }

    /**
     * Land a study stage
     * Land a study stage
     */
    async landStudyRaw(requestParameters: LandStudyRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling landStudy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/participant/studies/:id/land`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Land a study stage
     * Land a study stage
     */
    async landStudy(requestParameters: LandStudyRequest): Promise<void> {
        await this.landStudyRaw(requestParameters);
    }

    /**
     * Launch the next available study stage
     * Launch the next available study stage
     */
    async launchStudyRaw(requestParameters: LaunchStudyRequest): Promise<runtime.ApiResponse<Launch>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling launchStudy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/participant/studies/:id/launch`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => LaunchFromJSON(jsonValue));
    }

    /**
     * Launch the next available study stage
     * Launch the next available study stage
     */
    async launchStudy(requestParameters: LaunchStudyRequest): Promise<Launch> {
        const response = await this.launchStudyRaw(requestParameters);
        return await response.value();
    }

    /**
     * Remove a researcher from a study.  Cannot remove the last researcher.
     * Remove a researcher from a study
     */
    async removeResearcherFromStudyRaw(requestParameters: RemoveResearcherFromStudyRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.studyId === null || requestParameters.studyId === undefined) {
            throw new runtime.RequiredError('studyId','Required parameter requestParameters.studyId was null or undefined when calling removeResearcherFromStudy.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling removeResearcherFromStudy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/researcher/studies/{study_id}/researcher/{user_id}`.replace(`{${"study_id"}}`, encodeURIComponent(String(requestParameters.studyId))).replace(`{${"user_id"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Remove a researcher from a study.  Cannot remove the last researcher.
     * Remove a researcher from a study
     */
    async removeResearcherFromStudy(requestParameters: RemoveResearcherFromStudyRequest): Promise<void> {
        await this.removeResearcherFromStudyRaw(requestParameters);
    }

    /**
     * Update a stage
     * Update a stage
     */
    async updateStageRaw(requestParameters: UpdateStageRequest): Promise<runtime.ApiResponse<Stage>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateStage.');
        }

        if (requestParameters.stage === null || requestParameters.stage === undefined) {
            throw new runtime.RequiredError('stage','Required parameter requestParameters.stage was null or undefined when calling updateStage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/researcher/stages/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: StageUpdateToJSON(requestParameters.stage),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => StageFromJSON(jsonValue));
    }

    /**
     * Update a stage
     * Update a stage
     */
    async updateStage(requestParameters: UpdateStageRequest): Promise<Stage> {
        const response = await this.updateStageRaw(requestParameters);
        return await response.value();
    }

    /**
     * Update a study
     * Update a study
     */
    async updateStudyRaw(requestParameters: UpdateStudyRequest): Promise<runtime.ApiResponse<Study>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateStudy.');
        }

        if (requestParameters.study === null || requestParameters.study === undefined) {
            throw new runtime.RequiredError('study','Required parameter requestParameters.study was null or undefined when calling updateStudy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/researcher/studies/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: StudyUpdateToJSON(requestParameters.study),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => StudyFromJSON(jsonValue));
    }

    /**
     * Update a study
     * Update a study
     */
    async updateStudy(requestParameters: UpdateStudyRequest): Promise<Study> {
        const response = await this.updateStudyRaw(requestParameters);
        return await response.value();
    }

}

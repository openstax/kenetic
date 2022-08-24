/* tslint:disable */
/* eslint-disable */
/**
 * OpenStax Kinetic API
 * The Kinetic API for OpenStax.  Requests to this API should include `application/json` in the `Accept` header.  The desired API version is specified in the request URL, e.g. `[domain]/api/v1/researcher/studies`. While the API does support a default version, that version will change over time and therefore should not be used in production code! 
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
    AddBanner,
    AddBannerFromJSON,
    AddBannerToJSON,
    AddReward,
    AddRewardFromJSON,
    AddRewardToJSON,
    AddStage,
    AddStageFromJSON,
    AddStageToJSON,
    AddStudy,
    AddStudyFromJSON,
    AddStudyToJSON,
    BannerNotice,
    BannerNoticeFromJSON,
    BannerNoticeToJSON,
    BannersListing,
    BannersListingFromJSON,
    BannersListingToJSON,
    Environment,
    EnvironmentFromJSON,
    EnvironmentToJSON,
    Launch,
    LaunchFromJSON,
    LaunchToJSON,
    ParticipantStudies,
    ParticipantStudiesFromJSON,
    ParticipantStudiesToJSON,
    ParticipantStudy,
    ParticipantStudyFromJSON,
    ParticipantStudyToJSON,
    ParticipantStudyCompletion,
    ParticipantStudyCompletionFromJSON,
    ParticipantStudyCompletionToJSON,
    Reward,
    RewardFromJSON,
    RewardToJSON,
    RewardsListing,
    RewardsListingFromJSON,
    RewardsListingToJSON,
    ServerError,
    ServerErrorFromJSON,
    ServerErrorToJSON,
    Stage,
    StageFromJSON,
    StageToJSON,
    Studies,
    StudiesFromJSON,
    StudiesToJSON,
    Study,
    StudyFromJSON,
    StudyToJSON,
    UpdateBanner,
    UpdateBannerFromJSON,
    UpdateBannerToJSON,
    UpdatePreferences,
    UpdatePreferencesFromJSON,
    UpdatePreferencesToJSON,
    UpdateReward,
    UpdateRewardFromJSON,
    UpdateRewardToJSON,
    UpdateStage,
    UpdateStageFromJSON,
    UpdateStageToJSON,
    UpdateStudy,
    UpdateStudyFromJSON,
    UpdateStudyToJSON,
    UserPreferences,
    UserPreferencesFromJSON,
    UserPreferencesToJSON,
} from '../models';

export interface AddResearcherToStudyRequest {
    studyId: number;
    userId: string;
}

export interface AddStageRequest {
    studyId: number;
    addStage: AddStage;
}

export interface AddStudyRequest {
    addStudy?: AddStudy;
}

export interface CreateBannerRequest {
    addBanner: AddBanner;
}

export interface CreateRewardRequest {
    addReward: AddReward;
}

export interface DeleteBannerRequest {
    id: number;
}

export interface DeleteRewardRequest {
    id: number;
}

export interface DeleteStageRequest {
    id: number;
}

export interface DeleteStudyRequest {
    studyId: number;
}

export interface GetParticipantStudyRequest {
    id: number;
}

export interface GetStageRequest {
    id: number;
}

export interface LandStudyRequest {
    id: number;
    aborted?: LandStudyAbortedEnum;
    consent?: boolean;
    md?: object;
}

export interface LaunchStudyRequest {
    id: number;
    preview?: boolean;
}

export interface RemoveResearcherFromStudyRequest {
    studyId: number;
    userId: string;
}

export interface UpdateBannerRequest {
    id: number;
    updateBanner: UpdateBanner;
}

export interface UpdatePreferencesRequest {
    updatePreferences: UpdatePreferences;
}

export interface UpdateRewardRequest {
    id: number;
    updateReward: UpdateReward;
}

export interface UpdateStageRequest {
    id: number;
    updateStage: UpdateStage;
}

export interface UpdateStudyRequest {
    id: number;
    updateStudy?: UpdateStudy;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Add a researcher to a study
     * Add a researcher to a study
     */
    async addResearcherToStudyRaw(requestParameters: AddResearcherToStudyRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
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
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Add a researcher to a study
     * Add a researcher to a study
     */
    async addResearcherToStudy(requestParameters: AddResearcherToStudyRequest, initOverrides?: RequestInit): Promise<void> {
        await this.addResearcherToStudyRaw(requestParameters, initOverrides);
    }

    /**
     * Add a stage to study
     * Add a stage to a study
     */
    async addStageRaw(requestParameters: AddStageRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Stage>> {
        if (requestParameters.studyId === null || requestParameters.studyId === undefined) {
            throw new runtime.RequiredError('studyId','Required parameter requestParameters.studyId was null or undefined when calling addStage.');
        }

        if (requestParameters.addStage === null || requestParameters.addStage === undefined) {
            throw new runtime.RequiredError('addStage','Required parameter requestParameters.addStage was null or undefined when calling addStage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/researcher/studies/{study_id}/stages`.replace(`{${"study_id"}}`, encodeURIComponent(String(requestParameters.studyId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddStageToJSON(requestParameters.addStage),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StageFromJSON(jsonValue));
    }

    /**
     * Add a stage to study
     * Add a stage to a study
     */
    async addStage(requestParameters: AddStageRequest, initOverrides?: RequestInit): Promise<Stage> {
        const response = await this.addStageRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Add a study
     * Add a study
     */
    async addStudyRaw(requestParameters: AddStudyRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Study>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/researcher/studies`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddStudyToJSON(requestParameters.addStudy),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StudyFromJSON(jsonValue));
    }

    /**
     * Add a study
     * Add a study
     */
    async addStudy(requestParameters: AddStudyRequest = {}, initOverrides?: RequestInit): Promise<Study> {
        const response = await this.addStudyRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Add a banner
     */
    async createBannerRaw(requestParameters: CreateBannerRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<BannerNotice>> {
        if (requestParameters.addBanner === null || requestParameters.addBanner === undefined) {
            throw new runtime.RequiredError('addBanner','Required parameter requestParameters.addBanner was null or undefined when calling createBanner.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/admin/banners`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddBannerToJSON(requestParameters.addBanner),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BannerNoticeFromJSON(jsonValue));
    }

    /**
     * Add a banner
     */
    async createBanner(requestParameters: CreateBannerRequest, initOverrides?: RequestInit): Promise<BannerNotice> {
        const response = await this.createBannerRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Add a reward
     */
    async createRewardRaw(requestParameters: CreateRewardRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Reward>> {
        if (requestParameters.addReward === null || requestParameters.addReward === undefined) {
            throw new runtime.RequiredError('addReward','Required parameter requestParameters.addReward was null or undefined when calling createReward.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/admin/rewards`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddRewardToJSON(requestParameters.addReward),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RewardFromJSON(jsonValue));
    }

    /**
     * Add a reward
     */
    async createReward(requestParameters: CreateRewardRequest, initOverrides?: RequestInit): Promise<Reward> {
        const response = await this.createRewardRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Remove a banner
     */
    async deleteBannerRaw(requestParameters: DeleteBannerRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteBanner.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/admin/banners/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Remove a banner
     */
    async deleteBanner(requestParameters: DeleteBannerRequest, initOverrides?: RequestInit): Promise<void> {
        await this.deleteBannerRaw(requestParameters, initOverrides);
    }

    /**
     * Remove a reward
     */
    async deleteRewardRaw(requestParameters: DeleteRewardRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteReward.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/admin/rewards/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Remove a reward
     */
    async deleteReward(requestParameters: DeleteRewardRequest, initOverrides?: RequestInit): Promise<void> {
        await this.deleteRewardRaw(requestParameters, initOverrides);
    }

    /**
     * Delete a stage
     * Delete a stage
     */
    async deleteStageRaw(requestParameters: DeleteStageRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
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
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete a stage
     * Delete a stage
     */
    async deleteStage(requestParameters: DeleteStageRequest, initOverrides?: RequestInit): Promise<void> {
        await this.deleteStageRaw(requestParameters, initOverrides);
    }

    /**
     * Remove a study.  Cannot remove a study that has `first_lauched_at` set.
     * Deletes an unlaunched study
     */
    async deleteStudyRaw(requestParameters: DeleteStudyRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.studyId === null || requestParameters.studyId === undefined) {
            throw new runtime.RequiredError('studyId','Required parameter requestParameters.studyId was null or undefined when calling deleteStudy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/researcher/studies/{study_id}`.replace(`{${"study_id"}}`, encodeURIComponent(String(requestParameters.studyId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Remove a study.  Cannot remove a study that has `first_lauched_at` set.
     * Deletes an unlaunched study
     */
    async deleteStudy(requestParameters: DeleteStudyRequest, initOverrides?: RequestInit): Promise<void> {
        await this.deleteStudyRaw(requestParameters, initOverrides);
    }

    /**
     * Returns listing of all banners, expired or not 
     * Retrive list of all banners
     */
    async getBannersRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<BannersListing>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/admin/banners`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BannersListingFromJSON(jsonValue));
    }

    /**
     * Returns listing of all banners, expired or not 
     * Retrive list of all banners
     */
    async getBanners(initOverrides?: RequestInit): Promise<BannersListing> {
        const response = await this.getBannersRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get info about the deployment environment 
     * Get info about the deployment environment
     */
    async getEnvironmentRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Environment>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/environment`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EnvironmentFromJSON(jsonValue));
    }

    /**
     * Get info about the deployment environment 
     * Get info about the deployment environment
     */
    async getEnvironment(initOverrides?: RequestInit): Promise<Environment> {
        const response = await this.getEnvironmentRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get studies for the calling researcher. 
     * Get studies (available and completed) for the participant
     */
    async getParticipantStudiesRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<ParticipantStudies>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/participant/studies`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ParticipantStudiesFromJSON(jsonValue));
    }

    /**
     * Get studies for the calling researcher. 
     * Get studies (available and completed) for the participant
     */
    async getParticipantStudies(initOverrides?: RequestInit): Promise<ParticipantStudies> {
        const response = await this.getParticipantStudiesRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get participant-visible info for a study
     * Get participant-visible info for a study
     */
    async getParticipantStudyRaw(requestParameters: GetParticipantStudyRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ParticipantStudy>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getParticipantStudy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/participant/studies/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ParticipantStudyFromJSON(jsonValue));
    }

    /**
     * Get participant-visible info for a study
     * Get participant-visible info for a study
     */
    async getParticipantStudy(requestParameters: GetParticipantStudyRequest, initOverrides?: RequestInit): Promise<ParticipantStudy> {
        const response = await this.getParticipantStudyRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Returns the preferences, will create a default set of prefences if the user not saved them previously 
     * Obtain the current users preferences
     */
    async getPreferencesRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<UserPreferences>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/preferences`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserPreferencesFromJSON(jsonValue));
    }

    /**
     * Returns the preferences, will create a default set of prefences if the user not saved them previously 
     * Obtain the current users preferences
     */
    async getPreferences(initOverrides?: RequestInit): Promise<UserPreferences> {
        const response = await this.getPreferencesRaw(initOverrides);
        return await response.value();
    }

    /**
     * Returns listing of all rewards, expired or not 
     * Retrive list of all rewards
     */
    async getRewardsRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<RewardsListing>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/admin/rewards`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RewardsListingFromJSON(jsonValue));
    }

    /**
     * Returns listing of all rewards, expired or not 
     * Retrive list of all rewards
     */
    async getRewards(initOverrides?: RequestInit): Promise<RewardsListing> {
        const response = await this.getRewardsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get a stage
     * Get a stage
     */
    async getStageRaw(requestParameters: GetStageRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Stage>> {
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
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StageFromJSON(jsonValue));
    }

    /**
     * Get a stage
     * Get a stage
     */
    async getStage(requestParameters: GetStageRequest, initOverrides?: RequestInit): Promise<Stage> {
        const response = await this.getStageRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get studies for the calling researcher. 
     * Get studies for the calling researcher
     */
    async getStudiesRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Studies>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/researcher/studies`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StudiesFromJSON(jsonValue));
    }

    /**
     * Get studies for the calling researcher. 
     * Get studies for the calling researcher
     */
    async getStudies(initOverrides?: RequestInit): Promise<Studies> {
        const response = await this.getStudiesRaw(initOverrides);
        return await response.value();
    }

    /**
     * Land a study stage
     * Land a study stage
     */
    async landStudyRaw(requestParameters: LandStudyRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ParticipantStudyCompletion>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling landStudy.');
        }

        const queryParameters: any = {};

        if (requestParameters.aborted !== undefined) {
            queryParameters['aborted'] = requestParameters.aborted;
        }

        if (requestParameters.consent !== undefined) {
            queryParameters['consent'] = requestParameters.consent;
        }

        if (requestParameters.md !== undefined) {
            queryParameters['md'] = requestParameters.md;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/participant/studies/{id}/land`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ParticipantStudyCompletionFromJSON(jsonValue));
    }

    /**
     * Land a study stage
     * Land a study stage
     */
    async landStudy(requestParameters: LandStudyRequest, initOverrides?: RequestInit): Promise<ParticipantStudyCompletion> {
        const response = await this.landStudyRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Launch the next available study stage
     * Launch the next available study stage
     */
    async launchStudyRaw(requestParameters: LaunchStudyRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Launch>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling launchStudy.');
        }

        const queryParameters: any = {};

        if (requestParameters.preview !== undefined) {
            queryParameters['preview'] = requestParameters.preview;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/participant/studies/{id}/launch`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LaunchFromJSON(jsonValue));
    }

    /**
     * Launch the next available study stage
     * Launch the next available study stage
     */
    async launchStudy(requestParameters: LaunchStudyRequest, initOverrides?: RequestInit): Promise<Launch> {
        const response = await this.launchStudyRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Remove a researcher from a study.  Cannot remove the last researcher.
     * Remove a researcher from a study
     */
    async removeResearcherFromStudyRaw(requestParameters: RemoveResearcherFromStudyRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
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
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Remove a researcher from a study.  Cannot remove the last researcher.
     * Remove a researcher from a study
     */
    async removeResearcherFromStudy(requestParameters: RemoveResearcherFromStudyRequest, initOverrides?: RequestInit): Promise<void> {
        await this.removeResearcherFromStudyRaw(requestParameters, initOverrides);
    }

    /**
     * Update a banner
     */
    async updateBannerRaw(requestParameters: UpdateBannerRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<BannerNotice>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateBanner.');
        }

        if (requestParameters.updateBanner === null || requestParameters.updateBanner === undefined) {
            throw new runtime.RequiredError('updateBanner','Required parameter requestParameters.updateBanner was null or undefined when calling updateBanner.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/admin/banners/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateBannerToJSON(requestParameters.updateBanner),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BannerNoticeFromJSON(jsonValue));
    }

    /**
     * Update a banner
     */
    async updateBanner(requestParameters: UpdateBannerRequest, initOverrides?: RequestInit): Promise<BannerNotice> {
        const response = await this.updateBannerRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create or update the users preferences
     */
    async updatePreferencesRaw(requestParameters: UpdatePreferencesRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<UserPreferences>> {
        if (requestParameters.updatePreferences === null || requestParameters.updatePreferences === undefined) {
            throw new runtime.RequiredError('updatePreferences','Required parameter requestParameters.updatePreferences was null or undefined when calling updatePreferences.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/preferences`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UpdatePreferencesToJSON(requestParameters.updatePreferences),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserPreferencesFromJSON(jsonValue));
    }

    /**
     * Create or update the users preferences
     */
    async updatePreferences(requestParameters: UpdatePreferencesRequest, initOverrides?: RequestInit): Promise<UserPreferences> {
        const response = await this.updatePreferencesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update a reward
     */
    async updateRewardRaw(requestParameters: UpdateRewardRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Reward>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateReward.');
        }

        if (requestParameters.updateReward === null || requestParameters.updateReward === undefined) {
            throw new runtime.RequiredError('updateReward','Required parameter requestParameters.updateReward was null or undefined when calling updateReward.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/admin/rewards/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateRewardToJSON(requestParameters.updateReward),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RewardFromJSON(jsonValue));
    }

    /**
     * Update a reward
     */
    async updateReward(requestParameters: UpdateRewardRequest, initOverrides?: RequestInit): Promise<Reward> {
        const response = await this.updateRewardRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update a stage
     * Update a stage
     */
    async updateStageRaw(requestParameters: UpdateStageRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Stage>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateStage.');
        }

        if (requestParameters.updateStage === null || requestParameters.updateStage === undefined) {
            throw new runtime.RequiredError('updateStage','Required parameter requestParameters.updateStage was null or undefined when calling updateStage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/researcher/stages/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateStageToJSON(requestParameters.updateStage),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StageFromJSON(jsonValue));
    }

    /**
     * Update a stage
     * Update a stage
     */
    async updateStage(requestParameters: UpdateStageRequest, initOverrides?: RequestInit): Promise<Stage> {
        const response = await this.updateStageRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update a study
     * Update a study
     */
    async updateStudyRaw(requestParameters: UpdateStudyRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Study>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateStudy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/researcher/studies/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateStudyToJSON(requestParameters.updateStudy),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StudyFromJSON(jsonValue));
    }

    /**
     * Update a study
     * Update a study
     */
    async updateStudy(requestParameters: UpdateStudyRequest, initOverrides?: RequestInit): Promise<Study> {
        const response = await this.updateStudyRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum LandStudyAbortedEnum {
    Refusedconsent = 'refusedconsent'
}

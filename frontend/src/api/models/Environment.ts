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

import { exists, mapValues } from '../runtime';
import type { BannerMessage } from './BannerMessage';
import {
    BannerMessageFromJSON,
    BannerMessageFromJSONTyped,
    BannerMessageToJSON,
} from './BannerMessage';
import type { EnvironmentUser } from './EnvironmentUser';
import {
    EnvironmentUserFromJSON,
    EnvironmentUserFromJSONTyped,
    EnvironmentUserToJSON,
} from './EnvironmentUser';
import type { Researcher } from './Researcher';
import {
    ResearcherFromJSON,
    ResearcherFromJSONTyped,
    ResearcherToJSON,
} from './Researcher';
import type { RewardsScheduleSegment } from './RewardsScheduleSegment';
import {
    RewardsScheduleSegmentFromJSON,
    RewardsScheduleSegmentFromJSONTyped,
    RewardsScheduleSegmentToJSON,
} from './RewardsScheduleSegment';

/**
 * 
 * @export
 * @interface Environment
 */
export interface Environment {
    /**
     * 
     * @type {EnvironmentUser}
     * @memberof Environment
     */
    user: EnvironmentUser;
    /**
     * 
     * @type {Researcher}
     * @memberof Environment
     */
    researcher?: Researcher;
    /**
     * 
     * @type {string}
     * @memberof Environment
     */
    readonly accountsEnvName: string;
    /**
     * 
     * @type {string}
     * @memberof Environment
     */
    readonly homepageUrl: string;
    /**
     * The tags of the study object, used for grouping and filtering.
     * @type {Array<RewardsScheduleSegment>}
     * @memberof Environment
     */
    rewardsSchedule: Array<RewardsScheduleSegment>;
    /**
     * Banners that should be displayed to the user
     * @type {Array<BannerMessage>}
     * @memberof Environment
     */
    bannersSchedule: Array<BannerMessage>;
}

/**
 * Check if a given object implements the Environment interface.
 */
export function instanceOfEnvironment(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "user" in value;
    isInstance = isInstance && "accountsEnvName" in value;
    isInstance = isInstance && "homepageUrl" in value;
    isInstance = isInstance && "rewardsSchedule" in value;
    isInstance = isInstance && "bannersSchedule" in value;

    return isInstance;
}

export function EnvironmentFromJSON(json: any): Environment {
    return EnvironmentFromJSONTyped(json, false);
}

export function EnvironmentFromJSONTyped(json: any, ignoreDiscriminator: boolean): Environment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'user': EnvironmentUserFromJSON(json['user']),
        'researcher': !exists(json, 'researcher') ? undefined : ResearcherFromJSON(json['researcher']),
        'accountsEnvName': json['accounts_env_name'],
        'homepageUrl': json['homepage_url'],
        'rewardsSchedule': ((json['rewards_schedule'] as Array<any>).map(RewardsScheduleSegmentFromJSON)),
        'bannersSchedule': ((json['banners_schedule'] as Array<any>).map(BannerMessageFromJSON)),
    };
}

export function EnvironmentToJSON(value?: Environment | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'user': EnvironmentUserToJSON(value.user),
        'researcher': ResearcherToJSON(value.researcher),
        'rewards_schedule': ((value.rewardsSchedule as Array<any>).map(RewardsScheduleSegmentToJSON)),
        'banners_schedule': ((value.bannersSchedule as Array<any>).map(BannerMessageToJSON)),
    };
}


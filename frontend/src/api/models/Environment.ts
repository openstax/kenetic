/* tslint:disable */
/* eslint-disable */
/**
 * OpenStax Kinetic API
 * The Kinetic API for OpenStax.  Requests to this API should include `application/json` in the `Accept` header.  The desired API version is specified in the request URL, e.g. `[domain]/api/v0/researcher/studies`. While the API does support a default version, that version will change over time and therefore should not be used in production code! 
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    RewardsScheduleSegment,
    RewardsScheduleSegmentFromJSON,
    RewardsScheduleSegmentFromJSONTyped,
    RewardsScheduleSegmentToJSON,
} from './';

/**
 * 
 * @export
 * @interface Environment
 */
export interface Environment {
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
}

export function EnvironmentFromJSON(json: any): Environment {
    return EnvironmentFromJSONTyped(json, false);
}

export function EnvironmentFromJSONTyped(json: any, ignoreDiscriminator: boolean): Environment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'accountsEnvName': json['accounts_env_name'],
        'homepageUrl': json['homepage_url'],
        'rewardsSchedule': ((json['rewards_schedule'] as Array<any>).map(RewardsScheduleSegmentFromJSON)),
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
        
        'rewards_schedule': ((value.rewardsSchedule as Array<any>).map(RewardsScheduleSegmentToJSON)),
    };
}



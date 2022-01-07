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
/**
 * 
 * @export
 * @interface RewardsScheduleSegment
 */
export interface RewardsScheduleSegment {
    /**
     * The Prize that will be awarded for this segment of time
     * @type {string}
     * @memberof RewardsScheduleSegment
     */
    prize?: string;
    /**
     * The number of points needed to be eligible
     * @type {string}
     * @memberof RewardsScheduleSegment
     */
    points?: string;
    /**
     * When the segment starts
     * @type {Date}
     * @memberof RewardsScheduleSegment
     */
    startAt?: Date;
    /**
     * When the segment ends
     * @type {Date}
     * @memberof RewardsScheduleSegment
     */
    endAt?: Date;
}

export function RewardsScheduleSegmentFromJSON(json: any): RewardsScheduleSegment {
    return RewardsScheduleSegmentFromJSONTyped(json, false);
}

export function RewardsScheduleSegmentFromJSONTyped(json: any, ignoreDiscriminator: boolean): RewardsScheduleSegment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'prize': !exists(json, 'prize') ? undefined : json['prize'],
        'points': !exists(json, 'points') ? undefined : json['points'],
        'startAt': !exists(json, 'start_at') ? undefined : (new Date(json['start_at'])),
        'endAt': !exists(json, 'end_at') ? undefined : (new Date(json['end_at'])),
    };
}

export function RewardsScheduleSegmentToJSON(value?: RewardsScheduleSegment | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'prize': value.prize,
        'points': value.points,
        'start_at': value.startAt === undefined ? undefined : (value.startAt.toISOString()),
        'end_at': value.endAt === undefined ? undefined : (value.endAt.toISOString()),
    };
}



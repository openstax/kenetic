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
/**
 * 
 * @export
 * @interface StageUpdate
 */
export interface StageUpdate {
    /**
     * An integer that describes the sort order for this stage
     * @type {number}
     * @memberof StageUpdate
     */
    readonly order?: number;
    /**
     * The name of the stage
     * @type {string}
     * @memberof StageUpdate
     */
    title?: string;
    /**
     * The longer description shown to participants
     * @type {string}
     * @memberof StageUpdate
     */
    description?: string;
    /**
     * How many days after previous stage will this become available
     * @type {number}
     * @memberof StageUpdate
     */
    availableAfterDays?: number;
    /**
     * The configuration for a particular kind of stage, e.g. Qualtrics.  See `QualtricsStage`
     * @type {object}
     * @memberof StageUpdate
     */
    config: object;
    /**
     * How many points the stage is worth
     * @type {number}
     * @memberof StageUpdate
     */
    points?: number;
    /**
     * How long the stage is (in minutes)
     * @type {number}
     * @memberof StageUpdate
     */
    durationMinutes?: number;
}

/**
 * Check if a given object implements the StageUpdate interface.
 */
export function instanceOfStageUpdate(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "config" in value;

    return isInstance;
}

export function StageUpdateFromJSON(json: any): StageUpdate {
    return StageUpdateFromJSONTyped(json, false);
}

export function StageUpdateFromJSONTyped(json: any, ignoreDiscriminator: boolean): StageUpdate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'order': !exists(json, 'order') ? undefined : json['order'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'availableAfterDays': !exists(json, 'available_after_days') ? undefined : json['available_after_days'],
        'config': json['config'],
        'points': !exists(json, 'points') ? undefined : json['points'],
        'durationMinutes': !exists(json, 'duration_minutes') ? undefined : json['duration_minutes'],
    };
}

export function StageUpdateToJSON(value?: StageUpdate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'title': value.title,
        'description': value.description,
        'available_after_days': value.availableAfterDays,
        'config': value.config,
        'points': value.points,
        'duration_minutes': value.durationMinutes,
    };
}


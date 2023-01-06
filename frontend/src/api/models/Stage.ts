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
 * @interface Stage
 */
export interface Stage {
    /**
     * The study ID.
     * @type {number}
     * @memberof Stage
     */
    readonly id: number;
    /**
     * An integer that describes the sort order for this stage
     * @type {number}
     * @memberof Stage
     */
    readonly order: number;
    /**
     * The name of the stage
     * @type {string}
     * @memberof Stage
     */
    title?: string;
    /**
     * The longer description shown to participants
     * @type {string}
     * @memberof Stage
     */
    description?: string;
    /**
     * How many days after previous stage will this become available
     * @type {number}
     * @memberof Stage
     */
    availableAfterDays?: number;
    /**
     * The configuration for a particular kind of stage, e.g. Qualtrics.  See `QualtricsStage`
     * @type {object}
     * @memberof Stage
     */
    config: object;
    /**
     * How many points the stage is worth
     * @type {number}
     * @memberof Stage
     */
    points?: number;
    /**
     * How long the stage is (in minutes)
     * @type {number}
     * @memberof Stage
     */
    durationMinutes?: number;
}

export function StageFromJSON(json: any): Stage {
    return StageFromJSONTyped(json, false);
}

export function StageFromJSONTyped(json: any, ignoreDiscriminator: boolean): Stage {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'order': json['order'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'availableAfterDays': !exists(json, 'available_after_days') ? undefined : json['available_after_days'],
        'config': json['config'],
        'points': !exists(json, 'points') ? undefined : json['points'],
        'durationMinutes': !exists(json, 'duration_minutes') ? undefined : json['duration_minutes'],
    };
}

export function StageToJSON(value?: Stage | null): any {
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


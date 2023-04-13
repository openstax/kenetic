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
 * @interface ParticipantStudyStage
 */
export interface ParticipantStudyStage {
    /**
     * An integer that describes the sort order for this stage
     * @type {number}
     * @memberof ParticipantStudyStage
     */
    readonly order?: number;
    /**
     * The name of the stage
     * @type {string}
     * @memberof ParticipantStudyStage
     */
    readonly title?: string;
    /**
     * The longer description shown to participants
     * @type {string}
     * @memberof ParticipantStudyStage
     */
    readonly description?: string;
    /**
     * How many days after previous stage will this become available
     * @type {number}
     * @memberof ParticipantStudyStage
     */
    readonly availableAfterDays?: number;
    /**
     * Has the stage been completed
     * @type {boolean}
     * @memberof ParticipantStudyStage
     */
    readonly isCompleted?: boolean;
    /**
     * Can the stage be launched
     * @type {boolean}
     * @memberof ParticipantStudyStage
     */
    readonly isLaunchable?: boolean;
    /**
     * How long the stage lasts
     * @type {number}
     * @memberof ParticipantStudyStage
     */
    readonly durationMinutes?: number;
    /**
     * How many points the stage is worth
     * @type {number}
     * @memberof ParticipantStudyStage
     */
    readonly points?: number;
    /**
     * When the stage opens for participation; null means not open.
     * @type {Date}
     * @memberof ParticipantStudyStage
     */
    opensAt?: Date | null;
    /**
     * When the stage closes for participation; null means does not close.
     * @type {Date}
     * @memberof ParticipantStudyStage
     */
    closesAt?: Date | null;
    /**
     * Feedback types for this stage
     * @type {Array<string>}
     * @memberof ParticipantStudyStage
     */
    feedbackTypes?: Array<string>;
    /**
     * Desired sample size set by researcher
     * @type {number}
     * @memberof ParticipantStudyStage
     */
    targetSampleSize?: number;
    /**
     * Status of the study
     * @type {string}
     * @memberof ParticipantStudyStage
     */
    status?: ParticipantStudyStageStatusEnum;
}


/**
 * @export
 */
export const ParticipantStudyStageStatusEnum = {
    Active: 'active',
    Paused: 'paused',
    Scheduled: 'scheduled',
    Draft: 'draft',
    WaitingPeriod: 'waiting_period',
    ReadyForLaunch: 'ready_for_launch',
    Completed: 'completed'
} as const;
export type ParticipantStudyStageStatusEnum = typeof ParticipantStudyStageStatusEnum[keyof typeof ParticipantStudyStageStatusEnum];


/**
 * Check if a given object implements the ParticipantStudyStage interface.
 */
export function instanceOfParticipantStudyStage(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ParticipantStudyStageFromJSON(json: any): ParticipantStudyStage {
    return ParticipantStudyStageFromJSONTyped(json, false);
}

export function ParticipantStudyStageFromJSONTyped(json: any, ignoreDiscriminator: boolean): ParticipantStudyStage {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'order': !exists(json, 'order') ? undefined : json['order'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'availableAfterDays': !exists(json, 'available_after_days') ? undefined : json['available_after_days'],
        'isCompleted': !exists(json, 'is_completed') ? undefined : json['is_completed'],
        'isLaunchable': !exists(json, 'is_launchable') ? undefined : json['is_launchable'],
        'durationMinutes': !exists(json, 'duration_minutes') ? undefined : json['duration_minutes'],
        'points': !exists(json, 'points') ? undefined : json['points'],
        'opensAt': !exists(json, 'opens_at') ? undefined : (json['opens_at'] === null ? null : new Date(json['opens_at'])),
        'closesAt': !exists(json, 'closes_at') ? undefined : (json['closes_at'] === null ? null : new Date(json['closes_at'])),
        'feedbackTypes': !exists(json, 'feedback_types') ? undefined : json['feedback_types'],
        'targetSampleSize': !exists(json, 'target_sample_size') ? undefined : json['target_sample_size'],
        'status': !exists(json, 'status') ? undefined : json['status'],
    };
}

export function ParticipantStudyStageToJSON(value?: ParticipantStudyStage | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'opens_at': value.opensAt === undefined ? undefined : (value.opensAt === null ? null : value.opensAt.toISOString()),
        'closes_at': value.closesAt === undefined ? undefined : (value.closesAt === null ? null : value.closesAt.toISOString()),
        'feedback_types': value.feedbackTypes,
        'target_sample_size': value.targetSampleSize,
        'status': value.status,
    };
}


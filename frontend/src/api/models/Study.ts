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
import {
    Researcher,
    ResearcherFromJSON,
    ResearcherFromJSONTyped,
    ResearcherToJSON,
} from './Researcher';
import {
    Stage,
    StageFromJSON,
    StageFromJSONTyped,
    StageToJSON,
} from './Stage';

/**
 * 
 * @export
 * @interface Study
 */
export interface Study {
    /**
     * The study ID.
     * @type {number}
     * @memberof Study
     */
    readonly id: number;
    /**
     * The study name that participants see.
     * @type {string}
     * @memberof Study
     */
    titleForParticipants: string;
    /**
     * An study name that only researchers see.
     * @type {string}
     * @memberof Study
     */
    titleForResearchers?: string;
    /**
     * A short study description.
     * @type {string}
     * @memberof Study
     */
    shortDescription: string;
    /**
     * A long study description.
     * @type {string}
     * @memberof Study
     */
    longDescription?: string;
    /**
     * The tags of the study object, used for grouping and filtering.
     * @type {Array<string>}
     * @memberof Study
     */
    tags: Array<string>;
    /**
     * Description of feedback displayed to the user upon study completion
     * @type {string}
     * @memberof Study
     */
    feedbackDescription?: string;
    /**
     * Freeform id of image that should be displayed on study card
     * @type {string}
     * @memberof Study
     */
    imageId?: string;
    /**
     * Description of how the study benefits participants
     * @type {string}
     * @memberof Study
     */
    benefits?: string;
    /**
     * The expected study duration in minutes.
     * @type {number}
     * @memberof Study
     */
    durationMinutes?: number;
    /**
     * is the study deleted
     * @type {boolean}
     * @memberof Study
     */
    isDeleted?: boolean;
    /**
     * When the study opens for participation; null means not open.
     * @type {Date}
     * @memberof Study
     */
    opensAt?: Date | null;
    /**
     * When the study closes for participation; null means does not close.
     * @type {Date}
     * @memberof Study
     */
    closesAt?: Date | null;
    /**
     * Mandatory studies must be completed by all users
     * @type {boolean}
     * @memberof Study
     */
    isMandatory?: boolean;
    /**
     * How many points will be awarded for participation in the study
     * @type {number}
     * @memberof Study
     */
    participationPoints?: number;
    /**
     * The URL to which stages should return after completing
     * @type {string}
     * @memberof Study
     */
    readonly returnUrl?: string;
    /**
     * The study's researchers.
     * @type {Array<Researcher>}
     * @memberof Study
     */
    researchers?: Array<Researcher>;
    /**
     * When the study was launched; null means not launched
     * @type {Date}
     * @memberof Study
     */
    firstLaunchedAt?: Date;
    /**
     * The study's stages.
     * @type {Array<Stage>}
     * @memberof Study
     */
    stages?: Array<Stage>;
}

export function StudyFromJSON(json: any): Study {
    return StudyFromJSONTyped(json, false);
}

export function StudyFromJSONTyped(json: any, ignoreDiscriminator: boolean): Study {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'titleForParticipants': json['title_for_participants'],
        'titleForResearchers': !exists(json, 'title_for_researchers') ? undefined : json['title_for_researchers'],
        'shortDescription': json['short_description'],
        'longDescription': !exists(json, 'long_description') ? undefined : json['long_description'],
        'tags': json['tags'],
        'feedbackDescription': !exists(json, 'feedback_description') ? undefined : json['feedback_description'],
        'imageId': !exists(json, 'image_id') ? undefined : json['image_id'],
        'benefits': !exists(json, 'benefits') ? undefined : json['benefits'],
        'durationMinutes': !exists(json, 'duration_minutes') ? undefined : json['duration_minutes'],
        'isDeleted': !exists(json, 'is_deleted') ? undefined : json['is_deleted'],
        'opensAt': !exists(json, 'opens_at') ? undefined : (json['opens_at'] === null ? null : new Date(json['opens_at'])),
        'closesAt': !exists(json, 'closes_at') ? undefined : (json['closes_at'] === null ? null : new Date(json['closes_at'])),
        'isMandatory': !exists(json, 'is_mandatory') ? undefined : json['is_mandatory'],
        'participationPoints': !exists(json, 'participation_points') ? undefined : json['participation_points'],
        'returnUrl': !exists(json, 'return_url') ? undefined : json['return_url'],
        'researchers': !exists(json, 'researchers') ? undefined : ((json['researchers'] as Array<any>).map(ResearcherFromJSON)),
        'firstLaunchedAt': !exists(json, 'first_launched_at') ? undefined : (new Date(json['first_launched_at'])),
        'stages': !exists(json, 'stages') ? undefined : ((json['stages'] as Array<any>).map(StageFromJSON)),
    };
}

export function StudyToJSON(value?: Study | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'title_for_participants': value.titleForParticipants,
        'title_for_researchers': value.titleForResearchers,
        'short_description': value.shortDescription,
        'long_description': value.longDescription,
        'tags': value.tags,
        'feedback_description': value.feedbackDescription,
        'image_id': value.imageId,
        'benefits': value.benefits,
        'duration_minutes': value.durationMinutes,
        'is_deleted': value.isDeleted,
        'opens_at': value.opensAt === undefined ? undefined : (value.opensAt === null ? null : value.opensAt.toISOString()),
        'closes_at': value.closesAt === undefined ? undefined : (value.closesAt === null ? null : value.closesAt.toISOString()),
        'is_mandatory': value.isMandatory,
        'participation_points': value.participationPoints,
        'researchers': value.researchers === undefined ? undefined : ((value.researchers as Array<any>).map(ResearcherToJSON)),
        'first_launched_at': value.firstLaunchedAt === undefined ? undefined : (value.firstLaunchedAt.toISOString()),
        'stages': value.stages === undefined ? undefined : ((value.stages as Array<any>).map(StageToJSON)),
    };
}


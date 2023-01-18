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
import type { AnalysisUpdate } from './AnalysisUpdate';
import {
    AnalysisUpdateFromJSON,
    AnalysisUpdateFromJSONTyped,
    AnalysisUpdateToJSON,
} from './AnalysisUpdate';

/**
 * 
 * @export
 * @interface UpdateAnalysis
 */
export interface UpdateAnalysis {
    /**
     * 
     * @type {AnalysisUpdate}
     * @memberof UpdateAnalysis
     */
    analysis?: AnalysisUpdate;
}

/**
 * Check if a given object implements the UpdateAnalysis interface.
 */
export function instanceOfUpdateAnalysis(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateAnalysisFromJSON(json: any): UpdateAnalysis {
    return UpdateAnalysisFromJSONTyped(json, false);
}

export function UpdateAnalysisFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateAnalysis {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'analysis': !exists(json, 'analysis') ? undefined : AnalysisUpdateFromJSON(json['analysis']),
    };
}

export function UpdateAnalysisToJSON(value?: UpdateAnalysis | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'analysis': AnalysisUpdateToJSON(value.analysis),
    };
}


import { IValue } from '../model/value/IValue.js';
import { VariableValue } from './value/VariableValue.js';

/**
 * A simple key-value store for variables. Apart from storing the variables, it also provides a translation layer for
 * access to variables with deprecated names. For example, attempts to read or write to 'article_text' will be actually
 * redirected to 'page_title'.
 */
export class VariablesStore {

    /** Here the raw values of variables are stored */
    private readonly variables: Map<string, IValue> = new Map();

    private readonly translationTable: Record<string, string> = {
        'accountname': 'account_name',
        'all_links': 'new_links',
        'article_articleid': 'page_id',
        'article_first_contributor': 'page_first_contributor',
        'article_namespace': 'page_namespace',
        'article_prefixedtext': 'page_prefixedtitle',
        'article_recent_contributors': 'page_recent_contributors',
        'article_restrictions_create': 'page_restrictions_create',
        'article_restrictions_edit': 'page_restrictions_edit',
        'article_restrictions_move': 'page_restrictions_move',
        'article_restrictions_upload': 'page_restrictions_upload',
        'article_views': 'page_views',
        'article_text': 'page_title',
        'board_articleid': 'board_id',
        'board_text': 'board_title',
        'board_prefixedtext': 'board_prefixedtitle',
        'moved_from_articleid': 'moved_from_id',
        'moved_from_prefixedtext': 'moved_from_prefixedtitle',
        'moved_from_text': 'moved_from_title',
        'moved_to_articleid': 'moved_to_id',
        'moved_to_prefixedtext': 'moved_to_prefixedtitle',
        'moved_to_text': 'moved_to_title',
    };

    public get(variableName: string): VariableValue | null {
        variableName = this.normalizeName(variableName);

        const localValue = this.variables.get(variableName);
        if (localValue !== undefined) return VariableValue.fromValue(localValue, variableName);
        return null;
    }

    public set(variableName: string, newValue: IValue): void {
        variableName = this.normalizeName(variableName);
        this.variables.set(variableName, newValue);
    }
    
    private normalizeName(variableName: string): string {
        // Variable names are case-insensitive in AbuseFilter
        variableName = variableName.toLowerCase();
        if (variableName in this.translationTable) {
            return this.translationTable[variableName];
        }
        return variableName;
    }
}
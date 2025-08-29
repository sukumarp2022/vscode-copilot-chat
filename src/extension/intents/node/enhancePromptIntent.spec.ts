/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { describe, it, expect } from 'vitest';
import { Intent } from '../../../common/constants';
import { EnhancePromptIntent } from '../enhancePromptIntent';

describe('EnhancePromptIntent', () => {
	it('should have the correct intent ID', () => {
		expect(EnhancePromptIntent.ID).toBe(Intent.EnhancePrompt);
	});

	it('should be available in Panel location', () => {
		const intent = new EnhancePromptIntent({} as any, {} as any);
		expect(intent.locations).toContain('panel');
	});

	it('should have a proper description', () => {
		const intent = new EnhancePromptIntent({} as any, {} as any);
		expect(intent.description).toBeTruthy();
		expect(intent.description.length).toBeGreaterThan(0);
	});

	it('should have the correct intent id', () => {
		const intent = new EnhancePromptIntent({} as any, {} as any);
		expect(intent.id).toBe(Intent.EnhancePrompt);
	});
});
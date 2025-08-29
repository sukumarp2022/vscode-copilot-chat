/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { describe, it, expect } from 'vitest';
import { EnhancePromptPrompt } from '../enhancePrompt';

describe('EnhancePromptPrompt', () => {
	it('should create instance with proper props', () => {
		const mockProps = {
			promptContext: {
				query: 'test query',
				history: [],
				chatVariables: {} as any
			},
			originalPrompt: 'test prompt'
		};

		const prompt = new EnhancePromptPrompt(mockProps);
		expect(prompt).toBeDefined();
		expect(prompt.props.originalPrompt).toBe('test prompt');
	});

	it('should prepare state correctly', async () => {
		const mockProps = {
			promptContext: {
				query: 'test query',
				history: [],
				chatVariables: {} as any
			},
			originalPrompt: 'test prompt'
		};

		const prompt = new EnhancePromptPrompt(mockProps);
		const state = await prompt.prepare();
		expect(state).toEqual({});
	});
});
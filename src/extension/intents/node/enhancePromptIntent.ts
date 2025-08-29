/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as l10n from '@vscode/l10n';
import type * as vscode from 'vscode';
import { IResponsePart } from '../../../platform/chat/common/chatMLFetcher';
import { ChatLocation } from '../../../platform/chat/common/commonTypes';
import { IEndpointProvider } from '../../../platform/endpoint/common/endpointProvider';
import { IChatEndpoint } from '../../../platform/networking/common/networking';
import { CancellationToken } from '../../../util/vs/base/common/cancellation';
import { IInstantiationService } from '../../../util/vs/platform/instantiation/common/instantiation';
import { Intent } from '../../common/constants';
import { IBuildPromptContext } from '../../prompt/common/intents';
import { IIntent, IIntentInvocation, IIntentInvocationContext, IIntentSlashCommandInfo, IResponseProcessorContext, StreamingMarkdownReplyInterpreter } from '../../prompt/node/intents';
import { PromptRenderer, RendererIntentInvocation } from '../../prompts/node/base/promptRenderer';
import { EnhancePromptPrompt } from '../../prompts/node/panel/enhancePrompt';

class EnhancePromptIntentInvocation extends RendererIntentInvocation implements IIntentInvocation {

	protected readonly defaultQuery: string = 'Enhance this prompt to be more effective and specific.';

	constructor(
		intent: IIntent,
		location: ChatLocation,
		endpoint: IChatEndpoint,
		@IInstantiationService private readonly instantiationService: IInstantiationService,
	) {
		super(intent, location, endpoint);
	}

	override async buildPrompt(promptParams: IBuildPromptContext, progress: vscode.Progress<vscode.ChatResponseProgressPart | vscode.ChatResponseReferencePart>, token: vscode.CancellationToken) {
		if (promptParams.query === '') {
			promptParams = { ...promptParams, query: this.defaultQuery };
		}
		return super.buildPrompt(promptParams, progress, token);
	}

	createRenderer(promptContext: IBuildPromptContext, endpoint: IChatEndpoint, progress: vscode.Progress<vscode.ChatResponseProgressPart | vscode.ChatResponseReferencePart>, token: vscode.CancellationToken) {
		return PromptRenderer.create(this.instantiationService, endpoint, EnhancePromptPrompt, {
			promptContext,
			originalPrompt: promptContext.query
		});
	}

	processResponse(context: IResponseProcessorContext, inputStream: AsyncIterable<IResponsePart>, outputStream: vscode.ChatResponseStream, token: CancellationToken): Promise<void> {
		const replyInterpreter = new StreamingMarkdownReplyInterpreter();
		return replyInterpreter.processResponse(context, inputStream, outputStream, token);
	}
}

export class EnhancePromptIntent implements IIntent {

	static readonly ID = Intent.EnhancePrompt;
	readonly id: string = Intent.EnhancePrompt;
	readonly locations = [ChatLocation.Panel];
	readonly description: string = l10n.t('Enhance and improve the current prompt for better results');

	readonly commandInfo: IIntentSlashCommandInfo | undefined;

	constructor(
		@IEndpointProvider private readonly endpointProvider: IEndpointProvider,
		@IInstantiationService private readonly instantiationService: IInstantiationService,
	) { }

	async invoke(invocationContext: IIntentInvocationContext): Promise<IIntentInvocation> {
		const location = invocationContext.location;
		const endpoint = await this.endpointProvider.getChatEndpoint(invocationContext.request);
		return this.instantiationService.createInstance(EnhancePromptIntentInvocation, this, location, endpoint);
	}
}
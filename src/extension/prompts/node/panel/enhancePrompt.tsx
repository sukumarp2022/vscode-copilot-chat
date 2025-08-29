/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BasePromptElementProps, PromptElement, PromptPiece, PromptSizing, SystemMessage, UserMessage } from '@vscode/prompt-tsx';
import { IBuildPromptContext } from '../../../prompt/common/intents';
import { CopilotIdentityRules } from '../base/copilotIdentity';
import { InstructionMessage } from '../base/instructionMessage';
import { LegacySafetyRules } from '../base/safetyRules';
import { ChatVariablesAndQuery } from './chatVariables';
import { CodeBlockFormattingRules } from './codeBlockFormattingRules';
import { HistoryWithInstructions } from './conversationHistory';
import { CustomInstructions } from './customInstructions';

export interface EnhancePromptPromptProps extends BasePromptElementProps {
	promptContext: IBuildPromptContext;
	originalPrompt: string;
}

export interface EnhancePromptPromptState {
}

export class EnhancePromptPrompt extends PromptElement<EnhancePromptPromptProps, EnhancePromptPromptState> {

	constructor(props: EnhancePromptPromptProps) {
		super(props);
	}

	override async prepare(): Promise<EnhancePromptPromptState> {
		return {};
	}

	override async render(state: EnhancePromptPromptState, sizing: PromptSizing): Promise<PromptPiece> {
		const { query, history, chatVariables } = this.props.promptContext;

		return (
			<>
				<SystemMessage priority={1000}>
					You are an AI programming assistant that specializes in improving user prompts.<br />
					<CopilotIdentityRules />
					<LegacySafetyRules />
					Your task is to enhance and rewrite prompts to make them more effective, specific, and actionable.<br />
					<br />
					When enhancing prompts:<br />
					1. Make them more specific and detailed<br />
					2. Add relevant context and constraints<br />
					3. Include examples when helpful<br />
					4. Use clear, actionable language<br />
					5. Consider the user's likely intent and improve clarity<br />
					6. Maintain the original intent while making it more effective<br />
					<br />
					Provide the enhanced prompt in a code block, followed by a brief explanation of what improvements were made.<br />
					After your response, suggest that the user can copy the enhanced prompt and use it in a new conversation.<br />
				</SystemMessage>
				<HistoryWithInstructions flexGrow={1} historyPriority={700} passPriority history={history} currentTurnVars={chatVariables}>
					<InstructionMessage priority={1000}>
						Use Markdown formatting in your answers.<br />
						<CodeBlockFormattingRules />
						For code blocks use four backticks to start and end.<br />
						Avoid wrapping the whole response in triple backticks.<br />
					</InstructionMessage>
				</HistoryWithInstructions>
				<UserMessage flexGrow={2}>
					<CustomInstructions flexGrow={1} priority={750} languageId={undefined} chatVariables={chatVariables} />
					<ChatVariablesAndQuery flexGrow={3} flexReserve='/3' priority={900} chatVariables={chatVariables} query={query.length > 0 ? `Please enhance and improve the following prompt to make it more effective and specific:

"${query}"`
						: "Please provide guidance on how to write effective prompts for better AI assistance. Include best practices and examples."} includeFilepath={true} />
				</UserMessage>
			</>
		);
	}
}
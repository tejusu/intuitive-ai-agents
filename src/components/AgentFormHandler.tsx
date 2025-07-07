
import { ConversationalShoppingAssistant } from './ConversationalShoppingAssistant';
import { ResearchAssistantForm, ResearchFormValues } from './ResearchAssistantForm';

export interface ShoppingFormValues {
  query: string;
  category: string;
  budget: string;
  preferences: string;
}

interface AgentFormHandlerProps {
  showShoppingForm: boolean;
  showResearchForm: boolean;
  onShoppingSubmit: (values: ShoppingFormValues) => void;
  onResearchSubmit: (values: ResearchFormValues) => void;
}

export function AgentFormHandler({
  showShoppingForm,
  showResearchForm,
  onShoppingSubmit,
  onResearchSubmit
}: AgentFormHandlerProps) {
  if (showShoppingForm) {
    return <ConversationalShoppingAssistant />;
  }

  if (showResearchForm) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <ResearchAssistantForm onSubmit={onResearchSubmit} />
        </div>
      </div>
    );
  }

  return null;
}

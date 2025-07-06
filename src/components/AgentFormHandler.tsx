
import { ShoppingAssistantForm, ShoppingFormValues } from './ShoppingAssistantForm';
import { ResearchAssistantForm, ResearchFormValues } from './ResearchAssistantForm';

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
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <ShoppingAssistantForm onSubmit={onShoppingSubmit} />
        </div>
      </div>
    );
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

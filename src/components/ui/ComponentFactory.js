import TextInputComponent from '../ui/TextInputComponent';
import DateInputComponent from '../ui/DateInputComponent';
import EmailInputComponent from '../ui/EmailInputComponent';
import NumberInputComponent from '../ui/NumberInputComponent';

// Import schemas
import textInputSchema from '../../schemas/textInput.json';
import dateInputSchema from '../../schemas/dateInput.json';
import emailInputSchema from '../../schemas/emailInput.json';
import numberInputSchema from '../../schemas/numberInput.json';

const ComponentFactory = {
  // Component mapping
  components: {
    'text': TextInputComponent,
    'date': DateInputComponent,
    'email': EmailInputComponent,
    'number': NumberInputComponent
  },

  // Schema mapping
  schemas: {
    'text': textInputSchema,
    'date': dateInputSchema,
    'email': emailInputSchema,
    'number': numberInputSchema
  },

  // Get component by type
  getComponent: (type) => {
    return ComponentFactory.components[type] || TextInputComponent;
  },

  // Get schema by type
  getSchema: (type) => {
    return ComponentFactory.schemas[type] || textInputSchema;
  },

  // Render component
  renderComponent: (element, value, onChange, formData, isTouched, onTouch) => {
    const fieldName = element.scope.split('/').pop();
    const componentType = element.componentType || 'text';
    
    const Component = ComponentFactory.getComponent(componentType);
    const schema = ComponentFactory.getSchema(componentType);

    return (
      <Component
        key={element.scope}
        label={element.label}
        value={value}
        onChange={onChange}
        schema={schema}
        fieldName={fieldName}
        formData={formData}
        isTouched={isTouched}
        onTouch={onTouch}
      />
    );
  }
};

export default ComponentFactory;

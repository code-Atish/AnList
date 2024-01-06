import React from 'react';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { TitleCase } from '../utility/utilityFunctions';
import '../assets/styles/select.css';


const SelectDemo = ( { setVALanguage,languageRef,disabled } ) => {
 
  const languages = ['JAPANESE','ENGLISH', 'KOREAN', 'ITALIAN', 'SPANISH', 'PORTUGUESE', 'FRENCH', 'GERMAN', 'HEBREW', 'HUNGARIAN'];
  return (
        <div className="select_wrapper">
          <Select.Root className='SelectRoot'
                disabled={disabled}
                defaultValue={languageRef.current}
                onValueChange={(value)=>{
                        languageRef.current=value;
                        setVALanguage(value);
                      }}
          >
            <Select.Trigger className="SelectTrigger" aria-label="Language">
              <Select.Value placeholder="Language" />
              <Select.Icon className="SelectIcon">
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="SelectContent">
                <Select.ScrollUpButton className="SelectScrollButton">
                  <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="SelectViewport">

                  <Select.Separator className="SelectSeparator" />
                  <Select.Group>
                    {
                      languages.map((item,index)=>(
                        <SelectItem 
                              value={item}
                              key={index}
                        >
                              {TitleCase(item)}
                        </SelectItem>
                      ))
                    }
                  </Select.Group>

                  <Select.Separator className="SelectSeparator" />

                </Select.Viewport>
                <Select.ScrollDownButton className="SelectScrollButton">
                  <ChevronDownIcon />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
      </div>
);
}
const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {

  return (
    <Select.Item className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

export default SelectDemo;
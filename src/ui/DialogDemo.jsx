import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { FormatInput, GenreInput, SeasonInput, SourceInput, StatusInput, YearInput, YearSeasonInput } from './overViewTab/InputComponent/InputComponent';

const DialogDemo = ({formatProps,yearProps,seasonProps,statusProps,genreProps,sourceProps}) => {
  // const [status,,,,setStatus,]=statusProps;
  // const [source,,,,setSource,]=sourceProps;
return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {/* <button className="Button violet">Edit profile</button> */}
          <div className="extra_inputs">
              <i className="fa-solid fa-bars"></i>
          </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Filters</Dialog.Title>
          {/* <Dialog.Description className="DialogDescription">
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description> */}
              <div className="dialog_input">
                  {/* <FormatInput
                      formatProps={formatProps}
                      className={"Format"}
                  /> */}
                  <YearInput />
                  <SeasonInput />
                  {/* <GenreInput
                      genreProps={genreProps}
                      className={"Genre"}
                  /> */}
                  <StatusInput />

                  <SourceInput />

              </div>        
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <button className="Button green">Save changes</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export default DialogDemo;
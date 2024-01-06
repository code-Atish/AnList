import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  FormatInput,
  GenreInput,
  SeasonInput,
  SourceInput,
  StatusInput,
  YearInput,
  YearSeasonInput,
} from "../components/InputComponent/InputComponent";

const DialogDemo = () => {
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
          <div className="dialog_input">
            <FormatInput />
            <YearInput/>
            <SeasonInput />
            <GenreInput />
            <StatusInput />
            <SourceInput />
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
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
};
export default DialogDemo;

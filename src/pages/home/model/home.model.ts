import React from "react";

export interface ListItemModels {
  name: string;
  desc: string;
  message: string;
  time: string;
  actionButtons?: React.ReactNode;
  viewDeleteButtons?: React.ReactNode;
  buttonType: string;
}

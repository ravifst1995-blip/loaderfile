"use client";

import { LiveChatWidget } from "@livechat/widget-react";

function handleNewEvent(event) {
  console.log("LiveChatWidget.onNewEvent", event);
}

export default function LiveChatClient() {
  return (
    <LiveChatWidget
      license="" 
      // license="18590484" 
      visibility="maximized"
      onNewEvent={handleNewEvent}
    />
  );
}

import { useState } from "react";
import styled from "styled-components";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";
import imgUrl from "/ton-header.jpg";
import { MainButton, useShowPopup } from "@vkruglikov/react-telegram-web-app";

export function TransferTon() {
  const { sender, connected } = useTonConnect();
  const [apply, setApply] = useState(false);
  const [showMainBtn, setShowMainBtn] = useState(false);

  const [tonAmount, setTonAmount] = useState("0.01");
  const [tonRecipient, setTonRecipient] = useState(
    "UQAaccjM7AcRI9aJhSOEMb292QCWeZWjJ0RuahXrmHKUfxPj"
  );

  const stats = [
    { name: "Payout Pool", value: "80 000", unit: "TON" },
    { name: "Participant Goal", value: "10k" },
  ];

  return (
    <div>
      <Card>
        <FlexBoxCol>
          <img src={imgUrl} className="rounded-lg"></img>
          <h3 className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-sky-400 to-pink-600">
            TON Airdrop Campaign
          </h3>
          <div className="opacity-50 font-light -mt-4 mb-2">
            Milestone Based Airdrop
          </div>
          <div className="grid grid-cols-2 gap-px bg-white/5 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8"
              >
                <p className="text-sm font-medium leading-6 text-gray-400">
                  {stat.name}
                </p>
                <p className="mt-2 flex items-baseline gap-x-2">
                  <span className="text-2xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </span>
                  {stat.unit ? (
                    <span className="text-sm text-gray-400">{stat.unit}</span>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
          <div>
            {!apply && (
              <Button
                className="w-full"
                onClick={() => {
                  setApply(true);
                  setShowMainBtn(true);
                }}
              >
                Apply for Airdrop
              </Button>
            )}
          </div>
          {/* <FlexBoxRow>
          <label>Amount </label>
          <Input
            style={{ marginRight: 8 }}
            type="number"
            value={tonAmount}
            onChange={(e) => setTonAmount(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          <label>To </label>
          <Input
            style={{ marginRight: 8 }}
            value={tonRecipient}
            onChange={(e) => setTonRecipient(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <Button
          disabled={!connected}
          style={{ marginTop: 18 }}
          onClick={async () => {
            sender.send({
              to: Address.parse(tonRecipient),
              value: toNano(tonAmount),
            });
          }}
        >
          Transfer
        </Button> */}
        </FlexBoxCol>
      </Card>
      <MainButton text="Participate" />
    </div>
  );
}

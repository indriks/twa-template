import { useEffect, useState } from "react";
import styled from "styled-components";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button } from "./styled/styled";
import imgUrl from "/ton-header.jpg";
import {
  WebAppProvider,
  MainButton,
  BackButton,
} from "@vkruglikov/react-telegram-web-app";
import type { RadioChangeEvent } from "antd";
import { Input, Radio, Space } from "antd";

export function TransferTon() {
  const { sender, connected } = useTonConnect();
  const [apply, setApply] = useState(false);
  const [showMainBtn, setShowMainBtn] = useState(false);
  const [team, setTeam] = useState();
  const [tier, setTier] = useState();

  const [tonAmount, setTonAmount] = useState("0.01");
  const [tonRecipient, setTonRecipient] = useState(
    "UQAaccjM7AcRI9aJhSOEMb292QCWeZWjJ0RuahXrmHKUfxPj"
  );

  const stats = [
    { name: "Payout Pool", value: "80 000", unit: "TON" },
    { name: "Participant Goal", value: "10k" },
  ];
  const options = [
    { label: "Red team", value: "red" },
    { label: "Blue team", value: "blue" },
  ];
  const onTeamChange = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio1 checked", value);
    setTeam(value);
  };
  const onTierChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setTier(e.target.value);
  };

  useEffect(() => {
    setShowMainBtn(true);
  }, [tier]);

  return (
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}
    >
      <Card>
        <FlexBoxCol>
          <img src={imgUrl} className="rounded-lg"></img>
          <h3 className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-sky-400 to-pink-600">
            TON Airdrop Campaign
          </h3>
          <div className="opacity-50 font-light -mt-4 mb-2">
            Goal Based Airdrop
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
            {apply ? (
              <>
                <div className="mt-4 font-bold text-lg ">Apply for Airdrop</div>
                <div className="border-b text-sm opacity-50 border-slate-600/50 pb-2">
                  Choose Team and Tier
                </div>
                <div className="flex gap-2 items-baseline ">
                  {/* <div>Choose Team: </div> */}
                  <Radio.Group
                    options={options}
                    onChange={onTeamChange}
                    value={team}
                    optionType="button"
                    buttonStyle="solid"
                    className="mt-2 w-full"
                  />
                </div>
                <div>
                  <Radio.Group
                    onChange={onTierChange}
                    value={tier}
                    className="mt-2 w-full"
                  >
                    <Space direction="vertical">
                      <Radio
                        value={1}
                        className="text-slate-400 border border-slate-500/50 rounded-lg p-2 w-full"
                      >
                        <div className="font-bold text-white">Basic</div>
                        <div>Entry price: 10 TON</div>
                        <div>You get 50 points per each referral</div>
                      </Radio>
                      <Radio
                        value={2}
                        className="text-slate-400 border border-slate-500/50 rounded-lg p-2 w-full"
                      >
                        <div className="font-bold text-white">Moderate</div>
                        <div>Entry price: 50 TON</div>
                        <div>You get 250 points per each referral</div>
                      </Radio>
                      <Radio
                        value={3}
                        className="text-slate-400 border border-slate-500/50 rounded-lg p-2 w-full"
                      >
                        <div className="font-bold text-white">Agressive</div>
                        <div>Entry price: 70 TON</div>
                        <div>You get 400 points per each referral</div>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </div>
              </>
            ) : (
              <Button
                className="w-full"
                onClick={() => {
                  setApply(true);
                }}
              >
                Join to Airdrop
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
      <MainButton
        text="Participate"
        onClick={() => {
          setApply(false);
        }}
      />
    </WebAppProvider>
  );
}

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
  useHapticFeedback,
  ImpactOccurredFunction,
} from "@vkruglikov/react-telegram-web-app";
import type { RadioChangeEvent } from "antd";
import { App, Input, Radio, Space } from "antd";
import { supabase } from "../supabaseClient";
import { TonConnectButton } from "@tonconnect/ui-react";

export function TransferTon() {
  const { sender, connected, wallet, tx } = useTonConnect();
  const [apply, setApply] = useState(false);
  const [showMainBtn, setShowMainBtn] = useState(false);
  const [team, setTeam] = useState();
  const [tier, setTier] = useState();
  const [isParticipant, setIsParticipant] = useState(false);
  const [impactOccurred, notificationOccurred, selectionChanged] =
    useHapticFeedback();
  const [myStats, setMyStats] = useState([
    { points: Number },
    { team: String },
  ]);

  const [tonAmount, setTonAmount] = useState("1");
  const [tonRecipient, setTonRecipient] = useState(
    "0QAaccjM7AcRI9aJhSOEMb292QCWeZWjJ0RuahXrmHKUf6hp"
  );

  const stats = [
    { name: "Payout Pool", value: "80 000", unit: "TON" },
    { name: "Participant Goal", value: "10k" },
  ];
  const options = [
    { label: "🔴 Red team", value: "red" },
    { label: "🔵 Blue team", value: "blue" },
  ];
  const tiers = [
    { tier: 1, points: 50, price: 1 },
    { tier: 2, points: 250, price: 50 },
    { tier: 3, points: 400, price: 70 },
  ];
  const onTeamChange = ({ target: { value } }: RadioChangeEvent) => {
    setTeam(value);
  };
  const onTierChange = (e: RadioChangeEvent) => {
    setTier(e.target.value);
  };

  async function participate() {
    team && tier && addParticipant({ address: wallet, team, tier });
  }

  async function getParticipant(address: string) {
    const { data: participant, error } = await supabase
      .from("participants")
      .select("*")
      .eq("address", address)
      .single();
    if (error) {
      console.log(error);
    }
    participant && setIsParticipant(true);
    participant &&
      setMyStats([{ points: participant.points }, { team: participant.team }]);
  }

  async function addParticipant(data: { address: any; team: any; tier: any }) {
    const { data: participant, error } = await supabase
      .from("participants")
      .insert([
        {
          address: data.address,
          team: data.team,
          tier: data.tier,
          points: tiers[data.tier - 1].points,
          referrals: 0,
          paid: true,
        },
      ]);
    if (error) {
      console.log(error);
    }
    setApply(false);
  }

  useEffect(() => {
    wallet && getParticipant(wallet);
  }, [wallet]);

  useEffect(() => {
    tier! >= 0 && setShowMainBtn(true);
  }, [tier]);

  useEffect(() => {
    if (tx !== null) {
      participate();
    }
  }, [tx]);
  console.log(myStats);
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
            TON Airdrop Game
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
            {isParticipant ? (
              <div className="mt-4 font-bold text-lg ">
                <div>You are already participating</div>
                <div className="border-b text-sm opacity-50 border-slate-600/50 pb-2">
                  Your points: {myStats && <>{myStats[0].points}</>}
                </div>
                <div className="border-b text-sm opacity-50 border-slate-600/50 pb-2">
                  Team: {myStats && <>{myStats[1].team}</>}
                </div>
              </div>
            ) : null}
            {apply && (
              <>
                <div className="mt-4 font-bold text-lg ">Apply for Airdrop</div>
                <div className="border-b text-sm opacity-50 border-slate-600/50 pb-2">
                  Choose Team and Tier
                </div>
                <div className="flex gap-2 items-baseline ">
                  <Radio.Group
                    options={options}
                    onChange={() => {
                      onTeamChange;
                    }}
                    value={team}
                    optionType="button"
                    buttonStyle="solid"
                    className="mt-2 w-full"
                    onFocus={() => {
                      impactOccurred("light");
                    }}
                  />
                </div>
                <div>
                  <Radio.Group
                    onChange={() => {
                      onTierChange;
                    }}
                    onFocus={() => {
                      impactOccurred("light");
                    }}
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
            )}

            {!connected && (
              <div className="border border-lime-500/20 rounded-md p-4 bg-green-300/10 text-sm text-green-600">
                To start, please connect your wallet
              </div>
            )}

            {!apply && connected && (
              <Button
                className="w-full"
                onClick={() => {
                  setApply(true);
                  impactOccurred("medium");
                }}
              >
                Participate
              </Button>
            )}
          </div>
        </FlexBoxCol>
      </Card>
      {showMainBtn && (
        <>
          <Button
            className="w-full"
            disabled={!connected}
            onClick={async () => {
              impactOccurred("medium");
              try {
                // get return value
                const result = await sender.send({
                  to: Address.parse(tonRecipient),
                  value: toNano(tiers[tier! - 1].price),
                });
              } catch (error) {
                console.error("Error sending transaction:", error);
              }
            }}
          >
            Confirm
          </Button>
          <MainButton
            text="Confirm"
            onClick={async () => {
              impactOccurred("medium");
              try {
                // get return value
                const result = await sender.send({
                  to: Address.parse(tonRecipient),
                  value: toNano(tiers[tier! - 1].price),
                });
              } catch (error) {
                console.error("Error sending transaction:", error);
              }
              setApply(false);
            }}
          />
        </>
      )}
      {apply && (
        <BackButton
          onClick={() => {
            impactOccurred("light");
            setApply(false);
            setShowMainBtn(false);
          }}
        />
      )}
    </WebAppProvider>
  );
}

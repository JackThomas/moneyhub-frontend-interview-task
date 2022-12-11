/* eslint-disable max-statements */
import { add, format } from "date-fns";
import React from "react";
import { Button } from "../../components/button";
import InfoPill from "../../components/info-pill";
import RowContainer from "../../components/row-container";
import {
  AccountHeadline, AccountLabel, AccountList, AccountListItem, AccountSection, InfoText, Inset
} from "./style";
import { useState, useEffect } from 'react'

const formatPrice = (value) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(
    Math.abs(value)
  );
}

const formatPercentage = (value) => {
  return `${value.toFixed(1)}%`;
}

const Detail = ({ }) => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/account')
      .then((res) => res.json())
      .then((data) => {
        setAccount(data.account);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return (
      <Inset>
        <div>Loading...</div>
      </Inset>
    )
  } else {

    let mortgage;
    const lastUpdate = new Date(account.lastUpdate);

    if (account.associatedMortgages.length) {
      mortgage = account.associatedMortgages[0];
    }

    const yearsSincePurchase = (new Date() - new Date(account.originalPurchasePriceDate)) / 1000 / 60 / 60 / 24 / 365;
    const sincePurchase = account.recentValuation.amount - account.originalPurchasePrice;
    const sincePurchasePercentage = sincePurchase / account.originalPurchasePrice * 100;
    const annualAppreciation = sincePurchasePercentage / yearsSincePurchase;
    const originalPurchaseDate = new Date(account.originalPurchasePriceDate);

    return (

      <Inset>
        <AccountSection>
          <AccountLabel>Estimated Value</AccountLabel>
          <AccountHeadline>
            {new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP",
            }).format(account.recentValuation.amount)}
          </AccountHeadline>
          <AccountList>
            <AccountListItem><InfoText>
              {`Last updated ${format(lastUpdate, "do MMM yyyy")}`}
            </InfoText></AccountListItem>
            <AccountListItem><InfoText>
              {`Next update ${format(
                add(lastUpdate, { days: account.updateAfterDays }),
                "do MMM yyyy"
              )}`}
            </InfoText></AccountListItem>
          </AccountList>
        </AccountSection>

        <AccountSection>
          <AccountLabel>Property details</AccountLabel>
          <RowContainer>
            <AccountList>
              <AccountListItem><InfoText>{account.name}</InfoText></AccountListItem>
              <AccountListItem><InfoText>{account.bankName}</InfoText></AccountListItem>
              <AccountListItem><InfoText>{account.postcode}</InfoText></AccountListItem>
            </AccountList>
          </RowContainer>
        </AccountSection>

        <AccountSection>
          <AccountLabel>Valuation change</AccountLabel>
          <RowContainer>
            <AccountList>
              <AccountListItem><InfoText>Purchsed for <strong>{formatPrice(account.originalPurchasePrice)}</strong> in {format(originalPurchaseDate, "MMM yyyy")}</InfoText></AccountListItem>
              <AccountListItem justify="space-between"><InfoText>Since purchase</InfoText><InfoPill type="positive">{formatPrice(sincePurchase)} ({formatPercentage(sincePurchasePercentage)})</InfoPill></AccountListItem>
              <AccountListItem justify="space-between"><InfoText>Annual appreciation</InfoText><InfoPill type="positive">{formatPercentage(annualAppreciation)}</InfoPill></AccountListItem>
            </AccountList>
          </RowContainer>
        </AccountSection>

        {mortgage && (
          <AccountSection>
            <AccountLabel>Mortgage</AccountLabel>
            <RowContainer
              // This is a dummy action
              onClick={() => alert("You have navigated to the mortgage page")}
            >
              <AccountList>
                <AccountListItem><InfoText>
                  {new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(
                    Math.abs(account.associatedMortgages[0].currentBalance)
                  )}
                </InfoText></AccountListItem>
                <AccountListItem><InfoText>{account.associatedMortgages[0].name}</InfoText></AccountListItem>
              </AccountList>
            </RowContainer>
          </AccountSection>
        )}
        <Button
          // This is a dummy action
          onClick={() => alert("You have navigated to the edit account page")}
        >
          Edit account
        </Button>
      </Inset>
    );
  }
};

export default Detail;

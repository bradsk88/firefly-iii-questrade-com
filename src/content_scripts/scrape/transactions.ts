import {AccountRead} from "firefly-iii-typescript-sdk-fetch/dist/models/AccountRead";
import {parseDate} from "../../common/dates";
import {priceFromString} from "../../common/prices";
import {getAccountNumber} from "./accounts";

export function getButtonDestination(): Element {
    return document.querySelector('div.balances-view-filter.balances-table-block.cf')!;
}

/**
 * @param accounts The first page of account in your Firefly III instance
 */
export async function getCurrentPageAccount(
    accounts: AccountRead[],
): Promise<AccountRead> {
    const accountNumber = getAccountNumber();
    return accounts.find(
        acct => acct.attributes.accountNumber === accountNumber,
    )!;
}

export function isPageReadyForScraping(): boolean {
    return !!document.querySelector('div.balances-view.lg');
}

export function getRowElements(): Element[] {
    return [document.querySelector('td[data-qt=lblTotalEquity_BALANCES_ALL_CAD]')!]
}

export function getRowDate(el: Element): Date {
    return new Date();
}

function isRowLoading(r: Element): boolean {
    return false;
}

export function getRowAmount(r: Element, pageAccount: AccountRead): number {
    if (isRowLoading(r)) {
        throw new Error("Page is not ready for scraping")
    }
    const curBal = priceFromString(pageAccount.attributes.currentBalance || "0");
    const rowBal = priceFromString(getRowElements()[0].textContent!);
    return rowBal - curBal;
}

export function getRowDesc(r: Element): string {
    return "Balance update";
}

export function findBackToAccountsPageButton(): HTMLElement {
    return undefined!;
}
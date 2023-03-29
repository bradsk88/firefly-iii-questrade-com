import {OpeningBalance} from "../../background/firefly_export";
import {priceFromString} from "../../common/prices";

export function getButtonDestination(): Element {
    return document.querySelector('div.balances-view-filter.balances-table-block.cf')!;
}

export function isPageReadyForScraping(): boolean {
    return !!document.querySelector('div.balances-view.lg');
}

export function getAccountElements(): Element[] {
    return [document.querySelector('td[data-qt=lblTotalEquity_BALANCES_ALL_CAD]')!]
}

export function shouldSkipScrape(accountElement: Element): boolean {
    return false;
}

export function getAccountNumber(): string {
    const acctId = document.querySelector('select[data-qt=selIqSelectbox]')!.textContent!;
    return acctId.split(' - ')[0];
}

export function getAccountName(
    accountElement: Element,
): string {
    return document.querySelector('select[data-qt=selIqSelectbox]')!.textContent!;
}

export function getOpeningBalance(
    accountElement: Element,
): OpeningBalance | undefined {
    return {
        accountName: getAccountName(accountElement),
        accountNumber: getAccountNumber(),
        date: new Date(),
        balance: priceFromString(accountElement.textContent!),
    };
}
/**
 * @fileoverview Dummy data for testing the history and bookmark table components
 */

import { DateTime } from 'luxon';

/**
 * Interface for dummy history/bookmark item
 */
interface DummyItem {
    uuid: string;
    summaryUuid: string;
    summary: {
        title: string;
        summaryArray: string[];
    };
    createdAt: string;
    bookmark: boolean;
}

/**
 * Generates a dummy history item
 * @param {number} index - Index of the item
 * @returns {DummyItem} - Generated dummy item
 */
const generateDummyItem = (index: number): DummyItem => {
    const now = DateTime.now();
    const randomDays = Math.floor(Math.random() * 30);
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    
    return {
        uuid: `dummy-uuid-${index}`,
        summaryUuid: `summary-uuid-${index}`,
        summary: {
            title: `Sample Summary Title ${index + 1}`,
            summaryArray: [
                `This is a sample summary content for item ${index + 1}. It contains some dummy text to demonstrate how the table component handles longer content.`,
                `Additional summary content for item ${index + 1}. This shows how multiple summary items are displayed in the table.`
            ]
        },
        createdAt: now.minus({ days: randomDays, hours: randomHours, minutes: randomMinutes }).toISO(),
        bookmark: Math.random() > 0.5
    };
};

/**
 * Generates a list of dummy history items
 * @param {number} count - Number of items to generate
 * @returns {DummyItem[]} - Array of dummy items
 */
export const generateDummyHistory = (count: number = 20): DummyItem[] => {
    return Array.from({ length: count }, (_, i) => generateDummyItem(i));
};

/**
 * Generates a list of dummy bookmark items
 * @param {number} count - Number of items to generate
 * @returns {DummyItem[]} - Array of dummy items
 */
export const generateDummyBookmarks = (count: number = 10): DummyItem[] => {
    return Array.from({ length: count }, (_, i) => ({
        ...generateDummyItem(i),
        bookmark: true // All bookmark items are bookmarked
    }));
};

/**
 * Dummy history data structure
 */
export const dummyHistoryData = {
    summary: generateDummyHistory(),
    totalItems: 20,
    currentPage: 1,
    itemsPerPage: 10
};

/**
 * Dummy bookmark data structure
 */
export const dummyBookmarkData = generateDummyBookmarks(); 
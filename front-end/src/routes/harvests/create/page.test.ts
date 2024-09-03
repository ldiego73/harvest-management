import "@testing-library/jest-dom";

import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { expect, vi, test, describe, beforeEach, type Mock } from "vitest";
import CreateHarvestPage from "./+page.svelte";
import {
  createHarvest,
  getGrowers,
  getCommodities,
  getClients,
} from "$lib/api";
import { goto } from "$app/navigation";

vi.mock("$app/navigation", () => ({
  goto: vi.fn(),
}));

vi.mock("$lib/api", () => ({
  createHarvest: vi.fn(),
  getGrowers: vi.fn(),
  getCommodities: vi.fn(),
  getClients: vi.fn(),
}));

describe("Create Harvest Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(getGrowers).mockResolvedValue({
      growers: [
        {
          id: "1",
          name: "Luis",
          lastName: "Diego",
          email: "luis@diego.com",
          farms: [{ id: "1", name: "Farm A", address: "Address 1" }],
        },
      ],
      count: 1,
    });
    vi.mocked(getCommodities).mockResolvedValue({
      commodities: [
        {
          id: "1",
          name: "Apple",
          varieties: [{ id: "1", name: "Red Delicious" }],
        },
      ],
      count: 1,
    });
    vi.mocked(getClients).mockResolvedValue({
      clients: [
        { id: "1", name: "Client", lastName: "X", email: "client@x.com" },
      ],
      count: 1,
    });
  });

  test("renders form fields", async () => {
    render(CreateHarvestPage);

    await waitFor(() => {
      expect(screen.getByText("Create New Harvest")).toBeInTheDocument();
      expect(screen.getByLabelText(/grower/i)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/grower/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/farm/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/client/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/commodity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/variety/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/I confirm that all information is correct/i),
    ).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    (createHarvest as Mock).mockResolvedValue({});

    render(CreateHarvestPage);

    await screen.findByText("Create New Harvest");

    await fireEvent.change(screen.getByLabelText("Grower"), {
      target: { value: "1" },
    });
    await fireEvent.change(screen.getByLabelText("Farm"), {
      target: { value: "1" },
    });
    await fireEvent.change(screen.getByLabelText("Client"), {
      target: { value: "1" },
    });
    await fireEvent.change(screen.getByLabelText("Commodity"), {
      target: { value: "1" },
    });
    await fireEvent.change(screen.getByLabelText("Variety"), {
      target: { value: "1" },
    });
    await fireEvent.change(screen.getByLabelText("Quantity"), {
      target: { value: "10" },
    });
    await fireEvent.click(
      screen.getByLabelText("I confirm that all information is correct"),
    );

    await fireEvent.click(screen.getByText("Create Harvest"));

    expect(createHarvest).toHaveBeenCalledWith(
      expect.objectContaining({
        growerId: "1",
        farmId: "1",
        clientId: "1",
        commodityId: "1",
        varietyId: "1",
        quantity: 10,
        confirmCreation: true,
      }),
    );

    expect(goto).toHaveBeenCalledWith("/harvests");
  });

  test("shows validation errors for empty fields", async () => {
    render(CreateHarvestPage);

    await screen.findByText("Create New Harvest");

    await fireEvent.click(screen.getByText("Create Harvest"));

    expect(await screen.findByText("Required")).toBeInTheDocument();
    expect(screen.getAllByText("Required").length).toBeGreaterThan(1);
  });

  test("disables submit button when confirmation is not checked", async () => {
    render(CreateHarvestPage);

    await screen.findByText("Create New Harvest");

    const submitButton = screen.getByText("Create Harvest");
    expect(submitButton).toBeDisabled();

    await fireEvent.click(
      screen.getByLabelText("I confirm that all information is correct"),
    );
    expect(submitButton).not.toBeDisabled();
  });
});

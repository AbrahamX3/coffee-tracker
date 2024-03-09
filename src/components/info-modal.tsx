"use client";

import { SiInstagram as InstagramIcon } from "@icons-pack/react-simple-icons";
import { GlobeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

interface InfoModalProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export function InfoModal({
  selectedDate,
  setSelectedDate,
  setIsLoading,
}: InfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data,
    mutate,
    isLoading: isLoadingData,
  } = api.stats.getLogsByDate.useMutation({
    onSuccess: (data) => {
      if (data.length !== 0) return setIsOpen(true);

      toast.warning("No logs found for this date");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    setIsLoading(isLoadingData);
  }, [isLoadingData, setIsLoading]);

  useEffect(() => {
    if (!selectedDate) return;
    mutate({
      date: selectedDate,
    });
  }, [selectedDate, mutate]);

  function handleClose() {
    setIsOpen(false);
    setSelectedDate("");
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{selectedDate}</DialogTitle>
          <DialogDescription>
            Drank a total of {data?.length} cups of coffee
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="flex w-full">
              {data?.map((log, index) => (
                <TabsTrigger
                  value={`log-${index + 1}`}
                  key={`trigger-${log.id}`}
                  className="w-full"
                >
                  Coffee {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            {data?.map((log, index) => (
              <TabsContent
                value={`log-${index + 1}`}
                key={`content-${log.id}`}
                className="w-full"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{log.coffee.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 align-middle">
                      <span className="italic">
                        By {log.coffee.roaster.name}
                      </span>
                      {log.coffee.roaster.instagram && (
                        <a
                          className={cn(
                            buttonVariants({
                              variant: "outline",
                              size: "icon",
                            }),
                          )}
                          target="_blank"
                          rel="noreferrer noopener"
                          href={log.coffee.roaster.instagram}
                        >
                          <InstagramIcon className="h-4 w-4" />
                        </a>
                      )}

                      {log.coffee.roaster.website && (
                        <a
                          className={cn(
                            buttonVariants({
                              variant: "outline",
                              size: "icon",
                            }),
                          )}
                          target="_blank"
                          rel="noreferrer noopener"
                          href={log.coffee.roaster.website}
                        >
                          <GlobeIcon className="h-4 w-4" />
                        </a>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <dl>
                      <DescrptionLabel
                        title="Region"
                        description={log.coffee.region}
                      />
                      <DescrptionLabel
                        title="Varietal"
                        description={log.coffee.varietals
                          .map((v) => v.varietal.name)
                          .join(", ")}
                      />
                      <DescrptionLabel
                        title="Process"
                        description={log.coffee.process.name}
                      />
                      <DescrptionLabel
                        title="Roast"
                        description={log.coffee.roast ?? "N/A"}
                      />
                      <DescrptionLabel
                        title="Notes"
                        description={log.coffee.notes
                          .map((n) => n.note.name)
                          .join(", ")}
                      />
                      <DescrptionLabel
                        title="Altitude"
                        description={`${log.coffee.altitude} masl` ?? "N/A"}
                      />
                      <DescrptionLabel
                        title="SCA Score"
                        description={`${log.coffee.score} points` ?? "N/A"}
                      />
                    </dl>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DescrptionLabel({
  title,
  description,
}: {
  title: string;
  description: string | number;
}) {
  return (
    <>
      <dt className="font-bold">{title}</dt>
      <dd className="ml-3 text-foreground/60">{description}</dd>
    </>
  );
}

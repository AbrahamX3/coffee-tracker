"use client";

import { SiInstagram as InstagramIcon } from "@icons-pack/react-simple-icons";
import {
  CoffeeIcon,
  FlameIcon,
  GlobeIcon,
  LinkIcon,
  ListIcon,
  MapIcon,
  MapPinIcon,
  MountainIcon,
  NotebookIcon,
  SparkleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { buttonVariants } from "~/components/ui/button";
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
    <Dialog modal open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
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
            {data?.map((log, index) => {
              const isScoreAvailable =
                (log.coffee.sca ?? log.coffee.personal_sca) !== null;

              return (
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
                            <InstagramIcon
                              className="h-4 w-4"
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            />
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
                      <Tabs className="w-full" defaultValue="location">
                        <TabsList className="flex w-full">
                          <TabsTrigger className="w-full" value="location">
                            Location
                          </TabsTrigger>
                          <TabsTrigger className="w-full" value="bean">
                            Coffee Bean
                          </TabsTrigger>
                          {isScoreAvailable ? (
                            <TabsTrigger className="w-full" value="score">
                              Score
                            </TabsTrigger>
                          ) : null}
                        </TabsList>
                        <TabsContent className="p-2" value="location">
                          <dl>
                            <DescrptionGoogleMapsLink
                              title="Region"
                              description={log.coffee.region}
                              icon={<MapPinIcon className="h-4 w-4" />}
                            />
                            {log.coffee.estate ? (
                              <DescrptionLabel
                                title="Estate"
                                icon={<MapIcon className="h-4 w-4" />}
                                description={log.coffee.estate}
                              />
                            ) : null}
                            {log.coffee.altitude && log.coffee.altitude > 0 ? (
                              <DescrptionLabel
                                title="Altitude"
                                icon={<MountainIcon className="h-4 w-4" />}
                                description={`${log.coffee.altitude} masl`}
                              />
                            ) : null}
                          </dl>
                        </TabsContent>
                        <TabsContent className="p-2" value="bean">
                          <dl>
                            <DescrptionLabel
                              icon={<CoffeeIcon className="h-4 w-4" />}
                              title="Varietals"
                              description={log.coffee.varietals
                                .map((v) => v.varietal.name)
                                .join(", ")}
                            />
                            <DescrptionLabel
                              title="Process"
                              icon={<SparkleIcon className="h-4 w-4" />}
                              description={log.coffee.process.name}
                            />
                            <DescrptionLabel
                              title="Roast"
                              icon={<FlameIcon className="h-4 w-4" />}
                              description={log.coffee.roast.toLowerCase()}
                            />
                            <DescrptionLabel
                              title="Notes"
                              icon={<NotebookIcon className="h-4 w-4" />}
                              description={log.coffee.notes
                                .map((n) => n.note.name)
                                .join(", ")}
                            />
                          </dl>
                        </TabsContent>
                        <TabsContent className="p-2" value="score">
                          <dl>
                            {log.coffee.sca !== null && log.coffee.sca > 0 && (
                              <DescrptionLabel
                                icon={<ListIcon className="h-4 w-4" />}
                                title="SCA Score"
                                description={`${log.coffee.sca} SCA`}
                              />
                            )}

                            {log.coffee.personal_sca !== null &&
                              log.coffee.personal_sca > 0 && (
                                <DescrptionLabel
                                  icon={<ListIcon className="h-4 w-4" />}
                                  title="Personal SCA Score"
                                  description={`${log.coffee.personal_sca} SCA`}
                                />
                              )}
                          </dl>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DescrptionLabel({
  title,
  description,
  icon,
}: {
  title: string;
  description: string | number;
  icon: React.ReactNode;
}) {
  return (
    <>
      <dt className="flex items-center gap-2 align-baseline font-bold">
        <span>{title}</span>
        <span>{icon}</span>
      </dt>
      <dd className="ml-3 text-sm font-medium capitalize text-foreground/60">
        {description}
      </dd>
    </>
  );
}

function DescrptionGoogleMapsLink({
  title,
  description,
  icon,
}: {
  title: string;
  description: string | number;
  icon: React.ReactNode;
}) {
  return (
    <>
      <dt className="flex items-center gap-2 align-baseline font-bold">
        <span>{title}</span>
        <span>{icon}</span>
      </dt>
      <dd className="ml-3 text-sm font-medium">
        <a
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-foreground/60 transition duration-150 hover:text-foreground/80"
          href={`https://www.google.com/maps?q=${description}`}
        >
          <span>{description}</span> <LinkIcon className="h-3 w-3" />
        </a>
      </dd>
    </>
  );
}

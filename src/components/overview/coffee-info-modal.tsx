"use client";

import { format, tzDate } from "@formkit/tempo";
import {
  BeanIcon,
  ClipboardListIcon,
  CoffeeIcon,
  CogIcon,
  FlameIcon,
  GlobeIcon,
  InfoIcon,
  LinkIcon,
  ListChecksIcon,
  ListTodoIcon,
  MapIcon,
  MapPinIcon,
  MountainIcon,
  SparklesIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Icons } from "~/components/general/icons";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
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
      <DialogContent className="mx-auto max-w-fit rounded-md sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {format(
              tzDate(
                selectedDate,
                Intl.DateTimeFormat().resolvedOptions().timeZone,
              ),
              "full",
            )}
          </DialogTitle>
          <DialogDescription>
            Drank a total of {data?.length} cups of coffee
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Tabs defaultValue="coffee-1" className="w-full">
            <TabsList className="flex w-full">
              {data?.map((log, index) => (
                <TabsTrigger
                  value={`coffee-${index + 1}`}
                  key={`coffee_trigger-${log.id}`}
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
                  value={`coffee-${index + 1}`}
                  key={`coffee_info-${log.id}`}
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
                            rel="noreferrer"
                            href={log.coffee.roaster.instagram}
                          >
                            <Icons.instagram className="h-4 w-4" />
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
                            rel="noreferrer"
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
                            <GlobeIcon className="mr-2 h-3 w-3" /> Location
                          </TabsTrigger>
                          <TabsTrigger className="w-full" value="bean">
                            <CoffeeIcon className="mr-2 h-3 w-3" /> Coffee
                          </TabsTrigger>
                          {isScoreAvailable ? (
                            <TabsTrigger className="w-full" value="score">
                              <ClipboardListIcon className="mr-2 h-3 w-3" />{" "}
                              Score
                            </TabsTrigger>
                          ) : null}
                        </TabsList>
                        <TabsContent
                          className="rounded-md border-2 border-dashed p-4"
                          value="location"
                        >
                          <dl>
                            <DescrptionGoogleMapsLink
                              title="Region"
                              description={log.coffee.region}
                              icon={<MapPinIcon className="h-4 w-4" />}
                            />

                            {log.coffee.country ? (
                              <DescrptionLabel
                                title="Country"
                                description={log.coffee.country}
                                icon={<MapPinIcon className="h-4 w-4" />}
                              />
                            ) : null}

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

                            {log.coffee.producer ? (
                              <DescrptionLabel
                                title="Producer"
                                description={log.coffee.producer}
                                icon={<MapPinIcon className="h-4 w-4" />}
                              />
                            ) : null}
                          </dl>
                        </TabsContent>
                        <TabsContent
                          className="rounded-md border-2 border-dashed p-4"
                          value="bean"
                        >
                          <dl>
                            <DescrptionLabel
                              icon={<BeanIcon className="h-4 w-4" />}
                              title="Varietals"
                              description={log.coffee.varietals
                                .map((v) => v.varietal.name)
                                .join(", ")}
                            />
                            <DescrptionLabel
                              title="Process"
                              icon={<CogIcon className="h-4 w-4" />}
                              description={log.coffee.process.name}
                            />
                            <DescrptionLabel
                              title="Roast"
                              icon={<FlameIcon className="h-4 w-4" />}
                              description={log.coffee.roast.toLowerCase()}
                            />
                            <DescrptionLabel
                              title="Notes"
                              icon={<SparklesIcon className="h-4 w-4" />}
                              description={log.coffee.notes
                                .map((n) => n.note.name)
                                .join(", ")}
                            />
                          </dl>
                        </TabsContent>
                        <TabsContent
                          className="rounded-md border-2 border-dashed p-4"
                          value="score"
                        >
                          <dl>
                            {log.coffee.sca !== null && log.coffee.sca > 0 && (
                              <DescrptionLabel
                                icon={<ListChecksIcon className="h-4 w-4" />}
                                title="SCA Score"
                                description={`${log.coffee.sca} SCA`}
                              />
                            )}

                            {log.coffee.personal_sca !== null &&
                              log.coffee.personal_sca > 0 && (
                                <DescrptionInfoBadgeLabel
                                  icon={<ListTodoIcon className="h-4 w-4" />}
                                  title="Personal SCA Score"
                                  label="Obtained using SCA Cuping Score Calculator"
                                  href="https://sca.coffee/cuppingscore"
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
      <dt className="flex items-center gap-2 align-baseline font-semibold leading-loose tracking-wide">
        <span>{title}</span>
        <span>{icon}</span>
      </dt>
      <dd className="ml-3 text-sm font-medium capitalize text-foreground/80">
        {description}
      </dd>
    </>
  );
}

function DescrptionInfoBadgeLabel({
  title,
  description,
  icon,
  label,
  href,
}: {
  title: string;
  description: string | number;
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  return (
    <>
      <dt className="flex items-center gap-2 align-baseline font-semibold leading-loose tracking-wide">
        <span>{title}</span>
        <span>{icon}</span>
      </dt>
      <dd className="ml-3 flex items-center gap-2 align-middle text-sm font-medium capitalize text-foreground/80">
        <p>{description}</p>
        <Popover>
          <PopoverTrigger>
            <InfoIcon className="h-4 w-4 duration-150 ease-in-out hover:text-foreground" />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col items-center gap-2 align-middle leading-snug tracking-wide">
            <p>{label}</p>
            {href ? (
              <a
                href={href}
                className="text-foreground/60"
                target="_blank"
                rel="noreferrer"
              >
                {href}
              </a>
            ) : null}
          </PopoverContent>
        </Popover>
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
      <dt className="flex items-center gap-2 align-baseline font-semibold leading-loose tracking-wide">
        <span>{title}</span>
        <span className="">{icon}</span>
      </dt>
      <dd className="ml-3 text-sm font-medium capitalize text-foreground/80">
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
